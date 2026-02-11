import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Statistics() {
  return (
    <div className="space-y-10">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Статистика</h1>
        <p className="text-muted-foreground mt-2">
          Аналитика и отчёты за NPT, RPT, Major Release
        </p>
      </div>

      {/* Средний FPS по записям */}
      <Card className="border-border bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle>Средний FPS по записям</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-32 text-sm font-medium text-right">1.39 День 7</span>
              <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: '98%' }} // 118.39 / 120 ≈ 98%
                />
              </div>
              <span className="w-20 text-sm font-medium text-right">118,39</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-32 text-sm font-medium text-right">1.40 День 1</span>
              <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: '101%' }} // 121.40 > 120, чуть больше 100%
                />
              </div>
              <span className="w-20 text-sm font-medium text-right">121,40</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-32 text-sm font-medium text-right">1.40 День 7</span>
              <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-600 rounded-full transition-all"
                  style={{ width: '98.7%' }} // 118.43 / 120 ≈ 98.7%
                />
              </div>
              <span className="w-20 text-sm font-medium text-right">118,43</span>
            </div>

            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0,00</span>
              <span>20,00</span>
              <span>40,00</span>
              <span>60,00</span>
              <span>80,00</span>
              <span>100,00</span>
              <span>120,00</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* % АЗРК по записям */}
      <Card className="border-border bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle>% АЗРК по записям</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            АЗРК - Аварийное Завершение Работы Клиента (падение клиента). Запись - 1 человекобой. Прямая метрика стабильности.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-32 text-sm font-medium text-right">1.39 День 7</span>
              <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '16%' }} />
              </div>
              <span className="w-20 text-sm font-medium text-right">0,16%</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-32 text-sm font-medium text-right">1.40 День 1</span>
              <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '14%' }} />
              </div>
              <span className="w-20 text-sm font-medium text-right">0,14%</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-32 text-sm font-medium text-right">1.40 День 7</span>
              <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full" style={{ width: '13%' }} />
              </div>
              <span className="w-20 text-sm font-medium text-right">0,13%</span>
            </div>

            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0,00%</span>
              <span>0,20%</span>
              <span>0,40%</span>
              <span>0,60%</span>
              <span>0,80%</span>
              <span>1,00%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Остальные блоки — аналогично, просто повторяем структуру */}
      {/* % АЗРК по сессиям */}
      <Card className="border-border bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle>% АЗРК по сессиям</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Сессия - время от логина до любого завершения работы клиента или смены периферии. Прямая метрика стабильности.
          </p>
        </CardHeader>
        <CardContent>
          {/* Аналогично предыдущему — копируй структуру и меняй ширину/цвет/значения */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-32 text-sm font-medium text-right">1.39 День 7</span>
              <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '11%' }} />
              </div>
              <span className="w-20 text-sm font-medium text-right">1,10%</span>
            </div>
            {/* ... остальные строки аналогично ... */}
          </div>
        </CardContent>
      </Card>

      {/* % пострадавших игроков (ППИ) */}
      {/* Повторяем структуру — меняй только числа и ширину баров */}

      {/* Повторный вход в бой (ПВБ) */}
      {/* Аналогично */}
    </div>
  );
}