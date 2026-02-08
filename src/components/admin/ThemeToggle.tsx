import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import { Moon, Sun, Monitor } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const GetThemeIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-4 w-4" />;
    }
    return resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />;
  };

  const getThemeLabel = () => {
    if (theme === 'system') {
      return 'Système';
    }
    return resolvedTheme === 'dark' ? 'Clair' : 'Sombre';
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      className="h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={`Thème: ${getThemeLabel()}`}
    >
      {GetThemeIcon()}
    </Button>
  );
};
