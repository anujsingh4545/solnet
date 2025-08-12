import React from "react";

import { Toaster as Sonner, type ToasterProps } from "sonner";
import { useTheme } from "../../states/ThemeModeManager";

const ToasterProps = typeof Sonner;

const Toaster: React.FC<ToasterProps> = ({ ...props }) => {
    const {mode} = useTheme();

  return <Sonner theme={mode as ToasterProps["theme"]}  {...props} />;
};

export default Toaster;
