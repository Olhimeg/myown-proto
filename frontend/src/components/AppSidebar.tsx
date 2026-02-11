import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  HeartPulse, BarChart2, Activity, Gauge, Calendar, Settings, TestTube,
  ChevronLeft, ChevronRight, MonitorSmartphone, BookOpen, TerminalSquare
} from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { title: "Мониторинг состояния системы", url: "/health", icon: Activity },
  { title: "Производительность", url: "/perf", icon: Gauge },
  { title: "Стабильность", url: "/stability", icon: HeartPulse },
  { title: "Статистика", url: "/statistics", icon: BarChart2 },
  { title: "Планирование", url: "/planning", icon: Calendar },
  { title: "Тесты", url: "/tests", icon: TestTube },
  { title: "Удаленное управление стендами", url: "/remote", icon: MonitorSmartphone },
  { title: "Документация", url: "/docs", icon: BookOpen },
  { title: "Настройки", url: "/settings", icon: Settings },
  { title: "Debug Console", url: "/debug", icon: TerminalSquare },
];

export function AppSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  const [expanded, setExpanded] = useState(false); // по умолчанию узкий

  return (
    <TooltipProvider>
        <Sidebar
          collapsible="none"
          className={`fixed top-0 left-0 z-40 border-r transition-all duration-300 ease-in-out h-screen flex-shrink-0
            ${expanded ? 'w-72' : 'w-20'}`}
        >
        <SidebarContent className="flex flex-col h-full">

          {/* Основное меню */}
          <div className="flex-1 mt-24 overflow-y-auto">
            {menuItems.map((item) => (
              <Tooltip key={item.title} delayDuration={0}>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={`justify-center mb-2 ${expanded ? 'justify-start px-4' : 'px-0'}`}
                  >
                    <Link to={item.url} className="flex items-center gap-4 w-full py-4">
                      <item.icon className={`shrink-0 ${expanded ? 'h-7 w-7' : 'h-12 w-12'}`} /> {/* ← здесь увеличение */}
                      {expanded && <span className="text-base">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                {!expanded && (
                  <TooltipContent side="right" className="text-base">
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>

          {/* Кнопка разворачивания — в самом низу */}
          <div className="p-4 border-t mt-auto">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full p-3 rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-center gap-3"
              aria-label={expanded ? "Свернуть панель" : "Развернуть панель"}
            >
              {expanded ? (
                <>
                  <ChevronLeft className="h-6 w-6" />
                  <span className="text-sm font-medium">Свернуть</span>
                </>
              ) : (
                <ChevronRight className="h-6 w-6" />
              )}
            </button>
          </div>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  );
}