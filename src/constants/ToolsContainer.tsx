import React, { type ReactNode } from "react";
import { cn } from "../utils/cn";

interface toolsContainerProps {
  children: ReactNode;
  className?: string;
}

const ToolsContainer: React.FC<toolsContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        " border border-dashed  rounded-lg w-full md:w-[80%] h-fit border-primary/50 p-[15px]  md:p-[20px] flex items-center justify-center flex-col gap-[20px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ToolsContainer;
