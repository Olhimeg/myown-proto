// src/components/TopBar.tsx
import { Moon, Sun, Palette } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocation } from 'react-router-dom';

type Theme = 'light' | 'dark' | 'gray';

interface TopBarProps {
  theme: Theme;
  toggleTheme: (newTheme: Theme) => void;
}

export default function TopBar({ theme, toggleTheme }: TopBarProps) {
  const location = useLocation(); // ← получаем текущий путь

  // Маппинг пути → название страницы
  const pageTitles: Record<string, string> = {
    '/': 'Мониторинг состояния системы',
    '/dashboard': 'Мониторинг состояния системы',
    '/health': 'Мониторинг состояния системы',
    '/perf': 'Производительность',
    '/stability': 'Стабильность',
    '/statistics': 'Статистика',
    '/planning': 'Планирование',
    '/tests': 'Тесты',
    '/remote': 'Удалённое управление стендами',
    '/docs': 'Документация',
    '/settings': 'Настройки',
    '/debug': 'Debug Console',
  };

  const currentTitle = pageTitles[location.pathname] || 'PnC Multitool';

  const cycleTheme = () => {
    toggleTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'gray' : 'light');
  };

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun className="h-5 w-5 text-yellow-500" />;
    if (theme === 'dark') return <Moon className="h-5 w-5 text-slate-300" />;
    return <Palette className="h-5 w-5 text-gray-400" />;
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'Перейти на тёмную тему';
    if (theme === 'dark') return 'Перейти на тёмно-серую тему';
    return 'Перейти на светлую тему';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b bg-gradient-to-r from-background to-muted/20 px-8 flex items-center shadow-sm">
      {/* Динамическое название страницы */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold tracking-tight truncate">
          {currentTitle}
        </h2>
      </div>

      {/* Переключатель тем */}
      <div className="flex items-center gap-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={cycleTheme}
                className="p-3 rounded-full hover:bg-muted/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label={getThemeLabel()}
              >
                {getThemeIcon()}
              </button>
            </TooltipTrigger>
            <TooltipContent>{getThemeLabel()}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Профиль */}
        <div className="flex items-center gap-4 bg-muted/40 px-5 py-2.5 rounded-xl">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-green-500 flex items-center justify-center text-white text-lg font-bold">
            PnC
          </div>
          <span className="font-medium text-base">Demo User</span>
        </div>
      </div>
    </header>
  );
}