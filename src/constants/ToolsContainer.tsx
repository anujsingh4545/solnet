import React, { type ReactNode } from "react";

interface toolsContainerProps {
  children: ReactNode;
}

const ToolsContainer: React.FC<toolsContainerProps> = ({ children }) => {
  return (
    <div className=" border border-dashed  rounded-lg w-full md:w-[80%] h-fit border-primary/50 p-[15px]  md:p-[20px] flex items-center justify-center flex-col gap-[20px]">
      {children}
    </div>
  );
};

export default ToolsContainer;
