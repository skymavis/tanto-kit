import { Button } from '@nextui-org/react';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="pt-12 space-y-2 text-center">
      <div>Switch theme</div>
      <div className="flex gap-2 p-2 justify-center [&>button:disabled]:opacity-50">
        <Button size="sm" onClick={() => setTheme('dark')} disabled={theme === 'dark'}>
          Dark
        </Button>
        <Button size="sm" onClick={() => setTheme('light')} disabled={theme === 'light'}>
          Light
        </Button>
        <Button size="sm" onClick={() => setTheme('custom')} disabled={theme === 'custom'}>
          Custom
        </Button>
      </div>
    </div>
  );
}
