import { useEffect } from 'react';
import create from 'zustand';

export type Theme = 'dark' | 'light';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleDarkLightTheme: () => void;
}

export const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const THEME_EMOJI = {
  dark: '&#x1F31E;',
  light: '&#x1F31C;',
};

/**
 * Hook for handling theme within state.
 */
export const useThemeStore = create<ThemeStore>((set, get) => {
  const setTheme = (theme: Theme): void => {
    localStorage.setItem('cf-theme', theme);
    set({ theme });
  };

  return {
    theme: THEME.LIGHT as Theme,
    setTheme,
    toggleDarkLightTheme: () => {
      const currentTheme = get().theme;

      const theme: Theme = (
        currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
      ) as Theme;

      setTheme(theme);
    },
  };
});

/**
 * Hook for setting up theme based on localStorage and handling effects
 * within html directly.
 */
export const useThemeSetup = (): void => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const storedTheme = <Theme | undefined>localStorage.getItem('cf-theme');

    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    const themeClasses = Object.values(THEME).map((v) => `theme-${v}`);
    document.body.classList.remove(...themeClasses);
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);
};
