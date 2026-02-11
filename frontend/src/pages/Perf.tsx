export default function Perf() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Производительность</h1>
        <p className="text-muted-foreground mt-2">Тут должны быть тесты как в test-o-matic. Только лучше</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Прогресс по задачам</h2>
          <div className="space-y-4">
            {['MTDEV-99999 (92%)', 'MTCNT-111199 (87%)', 'MTDEV-112321 (81%)', 'MTDEV-992999 (78%)', 'MTDEV-99999 (72%)'].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span>{item}</span>
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${92 - i * 5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Загруженность лабы</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">76%</div>
              <div className="text-sm text-muted-foreground mt-2">ПК стенды</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">54%</div>
              <div className="text-sm text-muted-foreground mt-2">Серверы</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}