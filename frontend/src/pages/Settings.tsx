import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Настройки</h1>
        <p className="text-muted-foreground mt-2">Конфигурация системы и пользователя</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border bg-card p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Общие настройки</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Автоматическое обновление стендов</span>
              <Button variant="outline">Включено</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Уведомления по email</span>
              <Button variant="outline">Включено</Button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Пользователь</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Имя пользователя</label>
              <Input defaultValue="Demo User" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue="pncemail@lesta.group" className="mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}