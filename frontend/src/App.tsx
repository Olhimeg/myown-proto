import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Sun, Moon, Palette } from 'lucide-react';

// Импорты страниц (все твои)
import Health from '@/pages/Health';
import Debug from '@/pages/Debug';
import Stability from '@/pages/Stability';
import Perf from '@/pages/Perf';
import Planning from '@/pages/Planning';
import Tests from '@/pages/Tests';
import Remote from '@/pages/Remote';
import Docs from '@/pages/Docs';
import Settings from '@/pages/Settings';
import Statistics from '@/pages/Statistics';

type Theme = 'light' | 'dark' | 'gray';

// Компонент TopBar (вынесен для чистоты)
function TopBar({ theme, toggleTheme }: { theme: Theme; toggleTheme: (newTheme: Theme) => void }) {
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    '/': 'Мониторинг состояния системы',
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
      <div className="flex-1">
        <h2 className="text-2xl font-semibold tracking-tight truncate">
          {currentTitle}
        </h2>
      </div>

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

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved && ['light', 'dark', 'gray'].includes(saved)) return saved;
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark', 'gray');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className="flex min-h-screen w-full overflow-hidden">
          {/* Sidebar слева */}
          <div className="flex-shrink-0">
            <AppSidebar />
          </div>

          {/* Правая часть — с отступом слева под Sidebar */}
          <div className="flex flex-col flex-1 min-w-0 ml-20"> {/* ← отступ ml-20 (для узкого Sidebar) или ml-72 (для широкого) */}
            {/* TopBar */}
            <TopBar theme={theme} toggleTheme={toggleTheme} />

            {/* Контент страниц */}
            <main className="flex-1 overflow-auto pt-20 bg-background">
              <div className="mx-auto max-w-7xl w-full px-8 lg:px-10">
                <Routes>
                  <Route path="/" element={<Health />} />
                  <Route path="/health" element={<Health />} />
                  <Route path="/perf" element={<Perf />} />
                  <Route path="/stability" element={<Stability />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/planning" element={<Planning />} />
                  <Route path="/tests" element={<Tests />} />
                  <Route path="/remote" element={<Remote />} />
                  <Route path="/docs" element={<Docs />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/debug" element={<Debug />} />
                  <Route path="*" element={<div className="text-center py-32 text-3xl text-muted-foreground">404 — Страница не найдена</div>} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;