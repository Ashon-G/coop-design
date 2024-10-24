import React, { createContext, useContext, useState, ReactNode } from "react";
import { ThemeProvider as StyledComponentsProvider } from "styled-components/native";

// Define light and dark theme objects
const lightTheme = {
  primary: "#4A90E2",
  background: "#F5F5F5",
  text: "#333333",
  cardBackground: "#FFFFFF",
};

const darkTheme = {
  primary: "#2E5A88",
  background: "#fff",
  text: "#F5F5F5",
  cardBackground: "#2A2A2A",
};

// Define the type for ThemeContext
interface ThemeContextProps {
  theme: typeof lightTheme;
  toggleTheme: () => void;
}

// Define the props for ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

// Create ThemeContext with a default value
const ThemeContext = createContext<ThemeContextProps>({
  theme: lightTheme,
  toggleTheme: () => {},
});

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);

// Create the ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledComponentsProvider theme={theme}>
        {children}
      </StyledComponentsProvider>
    </ThemeContext.Provider>
  );
};
