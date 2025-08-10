import { Box, Sun, Moon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Switch } from "radix-ui";
import { useTheme } from "../states/ThemeModeManager";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ThemeProvider = React.memo(() => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { mode, setMode } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode: boolean = mode === "dark";

  return (
    <div className="flex items-center gap-2">
      <Sun className={` w-6 h-6 ${isDarkMode ? "text-primary/50" : "text-primary"} `} />
      <Switch.Root
        checked={isDarkMode}
        onCheckedChange={(checked) => {
          setMode(checked ? "dark" : "light");
        }}
        className="inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input "
      >
        <Switch.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
      </Switch.Root>
      <Moon className={` w-6 h-6 ${isDarkMode ? "text-primary" : "text-primary/50"} `} />
    </div>
  );
});

const Header = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { mode } = useTheme();
  const isDarkMode: boolean = mode === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
      animate={{
        boxShadow: scrolled
          ? `0px 4px 6px ${isDarkMode ? "rgba(250, 250, 250, 0.1)" : "rgba(23, 23, 23, 0.1)"}`
          : "0px 0px 0px rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 w-full !bg-background z-10 px-5 md:px-10 py-5 flex items-center justify-between"
    >
      <Link to={"/"} className=" flex items-center gap-2 !no-underline ">
        <Box className=" w-[35px] h-[35px] text-primary " />
        <div className="flex flex-col gap-4">
          <span className="tracking-tighter text-3xl font-extrabold text-primary flex gap-2 items-center">
            Solnet{" "}
            <span className="rounded-full text-base bg-primary/10 border border-primary/50 px-2">
              v1 &nbsp;. &nbsp;0
            </span>
          </span>
        </div>
      </Link>

      <ThemeProvider />
    </motion.div>
  );
};

export default Header;
