export default function Stability() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Стабильность</h1>
        <p className="text-muted-foreground mt-2">Тут что-то как в Crash Detector только лучше</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Успешно пройденные тесты</h2>
          <div className="text-5xl font-bold text-emerald-500">99.94%</div>
          <p className="text-sm text-muted-foreground mt-2">за последние 30 дней</p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Количество fails</h2>
          <div className="text-5xl font-bold text-amber-500">7</div>
          <p className="text-sm text-muted-foreground mt-2">за неделю (снижение на 42%)</p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Количество АЗРК</h2>
          <div className="text-5xl font-bold text-red-500">243</div>
          <p className="text-sm text-muted-foreground mt-2">за неделю (снижение на 42%)</p>
        </div>
      </div>
    </div>
  );
}