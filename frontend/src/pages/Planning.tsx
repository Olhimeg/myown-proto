import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from 'lucide-react';

export default function Planning() {
  // Пример данных: стенды и их занятость (можно потом брать из API)
  const stands = [
    { id: 'PC601', name: 'PC601', status: 'занят', tasks: [
      { test: 'Replay Perf', start: '09:00', end: '12:30', color: 'bg-blue-600' },
      { test: 'Smoke Test', start: '14:00', end: '16:00', color: 'bg-emerald-600' },
    ]},
    { id: 'PC501', name: 'PC501', status: 'свободен', tasks: [] },
    { id: 'PC401', name: 'PC401', status: 'занят', tasks: [
      { test: 'Hangar Load', start: '10:00', end: '18:00', color: 'bg-amber-600' },
    ]},
    { id: 'PC301', name: 'PC301', status: 'занят', tasks: [
      { test: 'Regression', start: '08:00', end: '11:00', color: 'bg-rose-600' },
    ]},
    { id: 'L201', name: 'L201', status: 'свободен', tasks: [] },
    { id: 'L101', name: 'L101', status: 'занят', tasks: [
      { test: 'Camera Flight', start: '13:00', end: '17:00', color: 'bg-purple-600' },
    ]},
    { id: 'mtqa13', name: 'mtqa13', status: 'занят', tasks: [
      { test: 'Stress Test', start: '09:30', end: '15:00', color: 'bg-indigo-600' },
    ]},
    { id: 'mtqa14', name: 'mtqa14', status: 'свободен', tasks: [] },
  ];

  // Временная шкала (часы с 08:00 до 20:00)
  const hours = Array.from({ length: 13 }, (_, i) => 8 + i);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Планирование</h1>
        <p className="text-muted-foreground mt-2">
          Календарь и расписание занятости тестовых стендов
        </p>
      </div>

      {/* Календарь + шкала занятости */}
      <Card className="border-border bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Занятость стендов на сегодня (05 февраля 2026)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Шапка часов */}
              <div className="grid grid-cols-13 gap-1 mb-2">
                <div className="text-sm text-muted-foreground font-medium">Стенд</div>
                {hours.map(hour => (
                  <div key={hour} className="text-xs text-center text-muted-foreground">
                    {hour}:00
                  </div>
                ))}
              </div>

              {/* Строки стендов */}
              {stands.map(stand => (
                <div key={stand.id} className="grid grid-cols-13 gap-1 mb-3 border-t border-border/50 pt-3">
                  {/* Название стенда */}
                  <div className="flex items-center gap-2 font-medium">
                    <Badge variant={stand.status === 'занят' ? 'default' : 'secondary'}>
                      {stand.name}
                    </Badge>
                  </div>

                  {/* Временная шкала */}
                  {hours.map(hour => {
                    const isOccupied = stand.tasks.some(task => {
                      const taskStart = task.start.split(':')[0];
                      const taskEnd = task.end.split(':')[0];
                      return hour >= parseInt(taskStart) && hour < parseInt(taskEnd);
                    });

                    return (
                      <div
                        key={hour}
                        className={`h-10 rounded-md transition-all ${
                          isOccupied
                            ? stand.tasks.find(task => {
                                const taskStart = task.start.split(':')[0];
                                const taskEnd = task.end.split(':')[0];
                                return hour >= parseInt(taskStart) && hour < parseInt(taskEnd);
                              })?.color || 'bg-primary/50'
                            : 'bg-muted/30'
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Легенда */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-blue-600" />
              <span>Replay Perf</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-emerald-600" />
              <span>Smoke Test</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-amber-600" />
              <span>Hangar Load</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-rose-600" />
              <span>Regression</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}