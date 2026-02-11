export default function Docs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Документация</h1>
        <p className="text-muted-foreground mt-2">Руководства, инструкции, API</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Быстрый старт", desc: "Как запустить тесты за 5 минут" },
          { title: "Руководство по стендам", desc: "Настройка и обслуживание" },
          { title: "API Multitool", desc: "Полная спецификация REST API" },
          { title: "Скрипты и автоматизация", desc: "Готовые примеры на Python" },
          { title: "Частые проблемы", desc: "Решения типичных ошибок" },
          { title: "Архив версий", desc: "История изменений" },
        ].map((item, i) => (
          <div key={i} className="rounded-xl border bg-card p-6 shadow hover:shadow-lg transition-all">
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}