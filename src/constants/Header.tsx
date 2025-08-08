import { Box, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Switch } from "radix-ui";

const ThemeProvider = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode: boolean = false;

  return (
    <div className="flex items-center gap-2">
      <Sun className={` w-6 h-6 ${isDarkMode ? "text-primary/50" : "text-primary"} `} />
      <Switch.Root checked={isDarkMode} onCheckedChange={(checked) => {}} className="inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input " >
        <Switch.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg " />
      </Switch.Root>
      <Moon className={` w-6 h-6 ${isDarkMode ? "text-primary" : "text-primary/50"} `} />
    </div>
  );
};

const Header = () => {
  return (
    <div className=" sticky top-0  w-full !bg-background z-10 shadow-md shadow-primary/10 px-10 py-5 flex items-center justify-between">
      <section className=" flex items-center gap-2 ">
        <Box className=" w-[35px] h-[35px] text-primary " />
        <div className="flex flex-col gap-4">
          <span className="tracking-tighter text-3xl font-extrabold text-primary flex gap-2 items-center">
            Solnet{" "}
            <span className="rounded-full text-base bg-primary/10 border border-primary/50 px-2">
              v1 &nbsp;. &nbsp;0
            </span>
          </span>
        </div>
      </section>

      <ThemeProvider />
    </div>
  );
};

export default Header;
