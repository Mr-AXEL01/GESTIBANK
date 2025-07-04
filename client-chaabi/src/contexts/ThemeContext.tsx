import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  primaryOpacity10: string;
  primaryOpacity20: string;
  primaryOpacity30: string;
  primaryOpacity40: string;
  primaryOpacity50: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  gradients: {
    primary: string;
    primaryToLight: string;
    primaryToDark: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Main theme color - change this to update the entire website
  const primaryColor = '#d98139';
  
  const colors: ThemeColors = {
    primary: primaryColor,
    primaryDark: '#c56f2a',
    primaryLight: '#e89449',
    primaryOpacity10: primaryColor + '1a',
    primaryOpacity20: primaryColor + '33',
    primaryOpacity30: primaryColor + '4d',
    primaryOpacity40: primaryColor + '66',
    primaryOpacity50: primaryColor + '80',
  };

  const gradients = {
    primary: `linear-gradient(to right, ${colors.primary}, ${colors.primaryDark})`,
    primaryToLight: `linear-gradient(to top, ${colors.primary}, ${colors.primaryLight})`,
    primaryToDark: `linear-gradient(to bottom right, ${colors.primary}, ${colors.primaryDark})`,
  };

  const value: ThemeContextType = {
    colors,
    gradients,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
