import { useWallet } from "@solana/wallet-adapter-react";
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
  mode: ThemeMode;
  setMode: Dispatch<SetStateAction<ThemeMode>>;
  isToolsLocked: boolean;
  setIsToolsLocked: Dispatch<SetStateAction<boolean>>;
}

interface ThemeModeManagerProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem("SOLNET_MODE") as ThemeMode | null;
  if (savedTheme) return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const ThemeModeManager: React.FC<ThemeModeManagerProps> = ({ children }) => {

  const {connected} = useWallet();
  const [mode, setMode] = useState<ThemeMode>(getInitialTheme);
  const [isToolsLocked, setIsToolsLocked] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("SOLNET_MODE", mode);
  }, [mode]);

  useEffect(()=>{
    // setIsToolsLocked(connected ?  false : true);
  },[connected])

  const value = useMemo(
    () => ({ mode, setMode, isToolsLocked, setIsToolsLocked }),
    [mode, isToolsLocked]
  );

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
