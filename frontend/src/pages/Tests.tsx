import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

export default function Tests() {
  const tests = [
    {
      name: 'Replay Performance test',
      type: 'Производительность по реплеям',
      author: 'a_malein',
      last: '05.02.2026 14:30',
      status: 'Успех',
    },
    {
      name: 'Camera flight test',
      type: 'Производительность и потребление памяти карты',
      author: 'a_malein',
      last: '04.02.2026 18:45',
      status: 'Успех',
    },
    {
      name: 'Hangar test',
      type: 'Производительность, потребление памяти и время загрузки ангара',
      author: 'a_malein',
      last: '03.02.2026',
      status: 'Ошибка',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Тесты</h1>
        <p className="text-muted-foreground mt-2">Список доступных тестов и их статус</p>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden shadow">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 text-left">Название теста</th>
              <th className="p-4 text-left">Тип</th>
              <th className="p-4 text-left">Автор</th>
              <th className="p-4 text-left">Последний запуск</th>
              <th className="p-4 text-left">Статус</th>
              <th className="p-4 text-left">Редактировать</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, i) => (
              <tr key={i} className="border-t hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium">{test.name}</td>
                <td className="p-4 text-muted-foreground">{test.type}</td>
                <td className="p-4 text-muted-foreground">{test.author}</td>
                <td className="p-4 text-muted-foreground">{test.last}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      test.status === 'Успех'
                        ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/30'
                        : 'bg-rose-950/50 text-rose-400 border border-rose-800/30'
                    }`}
                  >
                    {test.status}
                  </span>
                </td>
                <td className="p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 hover:bg-primary/10"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Редактировать
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}