import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "transition ease-in-out border border-border rounded-lg text-white font-medium flex items-center justify-center cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "hover:from-tertiary/80 hover:to-tertiary-foreground/80 bg-gradient-to-r from-tertiary to-tertiary-foreground text-white",
        primary:
          "hover:from-tertiary/80 hover:to-tertiary-foreground/80 bg-gradient-to-r from-primary/70 to-primary/90 text-secondary",
      },
      size: {
        default: "px-[20px] text-[12px] md:text-[14px] py-[8px] md:py-[10px]",
        sm: "px-[10px] text-[12px] py-[8px]",
        md: "px-[15px] text-[14px] py-[8px]",
        lg: "px-[24px] text-[16px] py-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button: React.FC<ButtonProps> = ({ className, variant, size, ...props }) => {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
};

export default Button;
