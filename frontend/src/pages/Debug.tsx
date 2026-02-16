import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Terminal, AlertCircle, Loader2 } from 'lucide-react';

// Базовый путь через прокси (vite.config.ts)
const API_PATH = '/api/debug';

// Тип задачи (синхронизирован с бэкендом)
interface Task {
  id: string;
  stand_id: string;
  command: string;
  params: Record<string, any>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  created_at: string;
  started_at?: string;
  finished_at?: string;
  logs: string[];
}

export default function Debug() {
  const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [standName, setStandName] = useState('');
  const [command, setCommand] = useState('');
  const [paramsJson, setParamsJson] = useState('{}'); // для поля params

  const [localLogs, setLocalLogs] = useState<string[]>([
    '[Система] Debug-консоль готова',
    '[Система] Введите стенд и команду для отправки',
  ]);

  const addLocalLog = (msg: string) => {
    const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLocalLogs(prev => [`[${ts}] ${msg}`, ...prev]);
  };

  // Получаем задачи
  const {
    data: allTasks = [],
    isLoading: isTasksLoading,
    isError: tasksError,
  } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axios.get(`${API_PATH}/tasks`);
      return res.data;
    },
    refetchInterval: 4000,
  });

  // Фильтруем задачи по текущему стенду (если введён)
  const filteredTasks = standName.trim()
    ? allTasks.filter(t => t.stand_id.toLowerCase().includes(standName.trim().toLowerCase()))
    : allTasks;

  // Мутация отправки
  const sendMutation = useMutation({
    mutationFn: async () => {
      let parsedParams;
      try {
        parsedParams = JSON.parse(paramsJson);
      } catch {
        throw new Error('Неверный JSON в params');
      }

      const res = await axios.post(`${API_PATH}/tasks`, {
        stand_id: standName.trim(),
        command: command.trim(),
        params: parsedParams,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      addLocalLog(`Задача отправлена на "${standName.trim()}": ${command.trim()}`);
      setCommand('');
      setParamsJson('{}');
    },
    onError: (err: any) => {
      addLocalLog(`Ошибка: ${err.message || err.response?.data?.detail || 'Неизвестная ошибка'}`);
    },
  });

  const handleSend = () => {
    if (!standName.trim() || !command.trim()) {
      addLocalLog('Ошибка: укажите стенд и команду');
      return;
    }
    sendMutation.mutate();
  };

  // Авто-скролл к последнему сообщению
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localLogs, filteredTasks]);

  return (
    <div className="h-full flex flex-col space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Debug Console</h1>
        <p className="text-muted-foreground mt-1">
          Ручное выполнение команд • Реал-тайм статусы и логи из бэкенда
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Ввод */}
        <Card className="lg:col-span-1 border-border bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              Управление
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Стенд / сервер</label>
              <Input
                value={standName}
                onChange={e => setStandName(e.target.value)}
                placeholder="stand-01, server-perf-02..."
                className="bg-muted/50 border-input font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Команда</label>
              <Textarea
                value={command}
                onChange={e => setCommand(e.target.value)}
                placeholder="git pull origin main\nshutdown /r /t 0\nipconfig /flushdns"
                className="min-h-[140px] resize-y bg-muted/50 border-input font-mono text-base leading-relaxed"
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                Shift + Enter — новая строка • Enter — отправить
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Параметры (JSON)</label>
              <Textarea
                value={paramsJson}
                onChange={e => setParamsJson(e.target.value)}
                placeholder='{"branch": "main", "force": true}'
                className="min-h-[80px] resize-y bg-muted/50 border-input font-mono text-sm"
              />
            </div>

            <Button
              onClick={handleSend}
              disabled={sendMutation.isPending || !standName.trim() || !command.trim()}
              className="w-full py-6 text-lg"
            >
              {sendMutation.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-3" />
                  Отправить
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Логи + задачи */}
        <Card className="lg:col-span-2 border-border bg-card/80 backdrop-blur-sm flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Логи и задачи
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full px-6 pb-6" ref={scrollRef}>
              <div className="space-y-4">

                {/* Локальные логи */}
                {localLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border text-sm font-mono leading-relaxed ${
                      log.includes('Ошибка')
                        ? 'bg-destructive/10 text-destructive border-destructive/30'
                        : log.includes('Успех') || log.includes('отправлена')
                        ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/30'
                        : 'bg-muted/30 text-muted-foreground border-muted'
                    }`}
                  >
                    {log}
                  </div>
                ))}

                {/* Задачи из бэкенда */}
                {isTasksLoading ? (
                  <div className="flex flex-col items-center py-10 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin mb-2" />
                    Загрузка...
                  </div>
                ) : tasksError ? (
                  <div className="text-center py-10 text-destructive">
                    Ошибка загрузки задач
                  </div>
                ) : filteredTasks.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    {standName.trim() ? `Нет задач для "${standName.trim()}"` : 'Задач пока нет'}
                  </div>
                ) : (
                  filteredTasks.map(task => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border text-sm font-mono ${
                        task.status === 'failed' ? 'bg-destructive/10 border-destructive/30' :
                        task.status === 'completed' ? 'bg-emerald-950/20 border-emerald-900/30' :
                        task.status === 'running' ? 'bg-amber-950/20 border-amber-900/30 animate-pulse' :
                        'bg-muted/30 border-muted'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold">{task.command}</span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            на {task.stand_id}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            task.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                            task.status === 'failed' ? 'bg-destructive/20 text-destructive' :
                            task.status === 'running' ? 'bg-amber-500/20 text-amber-400 animate-pulse' :
                            'bg-muted text-muted-foreground'
                          }`}
                        >
                          {task.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="text-xs text-muted-foreground mb-2">
                        Создано: {new Date(task.created_at).toLocaleString()}
                        {task.finished_at && ` • Завершено: ${new Date(task.finished_at).toLocaleString()}`}
                      </div>

                      {task.logs.length > 0 && (
                        <pre className="text-xs bg-black/40 p-3 rounded mt-2 overflow-x-auto whitespace-pre-wrap">
                          {task.logs.join('\n')}
                        </pre>
                      )}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}