import { Button } from '@/components/ui/button';
import { FileTerminal, PowerCircle, Terminal } from 'lucide-react';

export default function Remote() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Удалённое управление стендами</h1>
        <p className="text-muted-foreground mt-2">
          Тут можно будет управлять стендами не заходя в сторонние тулы
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-card p-6 shadow hover:shadow-lg transition-all duration-300"
          >
            <h3 className="font-semibold text-lg mb-4">
              Стенд-{String(i + 1).padStart(2, '0')}
            </h3>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start text-left h-12 font-normal border-border/50 hover:bg-muted/50"
              >
                <FileTerminal className="mr-4 h-6 w-6 text-primary" />
                Raritan KVM\Win SCP
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-left h-12 font-normal border-border/50 hover:bg-muted/50"
              >
                <Terminal className="mr-4 h-6 w-6 text-primary" />
                PowerShell\SSH консоль
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-left h-12 font-normal border-border/50 hover:bg-muted/50"
              >
                <PowerCircle className="mr-4 h-6 w-6 text-primary" />
                Reboot
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}