import React from 'react';
import Button from '../../common/button/Button';
import { THEME_EMOJI, useThemeStore } from '../../lib/theme';

export const ThemeModeToggle = ({
  className,
  ...restProps
}: {
  className: string;
}): JSX.Element => {
  const { theme, toggleDarkLightTheme } = useThemeStore();

  return (
    <Button
      onClick={() => toggleDarkLightTheme()}
      className={className}
      {...restProps}
    >
      {THEME_EMOJI[theme]}
    </Button>
  );
};
