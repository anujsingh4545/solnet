import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type ThemeMode = "dark" | "light";

interface ThemeContextType {
  mode: ThemeMode | null;
  setMode: Dispatch<SetStateAction<ThemeMode | null>>;
}

interface ThemeModeManagerProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeModeManager: React.FC<ThemeModeManagerProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("SOLNET_MODE") as ThemeMode | null;
    if (savedTheme) {
      setMode(savedTheme);
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setMode(isDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
     if (!mode) return;
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("SOLNET_MODE", mode);
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeModeManager;

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeModeManager");
  }
  return context;
}
