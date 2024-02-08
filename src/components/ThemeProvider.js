import React from 'react';
import { theme } from '../themes/theme';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
const ThemeProvider = ({ children }) => {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

export default ThemeProvider;
