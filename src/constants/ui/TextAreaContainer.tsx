import React from "react";
import { cn } from "../../utils/cn";

interface TextAreaContainerProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errorMessage?: string;
}

const TextAreaContainer: React.FC<TextAreaContainerProps> = ({ label, errorMessage, ...props }) => {
  return (
    <div className=" w-full flex items-start justify-between flex-col gap-[5px] font-mont ">
      <label className=" text-primary font-medium text-[12px] md:text-[14px] ">{label}</label>
      <textarea
        className={cn(
          "border w-full rounded-lg placeholder:text-primary/40 text-primary/80 bg-secondary px-[10px] py-[8px] outline-none text-[12px] md:text-[14px]",
          errorMessage ? "border-rose-700" : "border-border",
          props?.className
        )}
        {...props}
      />
      {errorMessage && (
        <span className="text-rose-700 font-medium text-[10px] md:text-[12px] ">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default TextAreaContainer;
