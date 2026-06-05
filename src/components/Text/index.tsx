import { Slot } from "@radix-ui/react-slot";
import styles from "./styles.module.css";
import React, { CSSProperties } from "react";

type TextProps = {
  children: React.ReactNode;
  asChild?: boolean;
  style?: CSSProperties;
  className?: string;
  align?: "left" | "center" | "justify";
  weight?: "thin" | "light" | "regular" | "medium" | "bold" | "black";
  size?: "xxs" | "xs" | "sm" | "default" | "md" | "lg" | "xl";
  family?: "inter" | "audiowide" | "orbitron";
} & React.HTMLAttributes<HTMLParagraphElement>;

export const Text = ({ children, asChild=false, family="inter", size="default", weight="regular", align="left", style, className="", ...props }: TextProps) => {
  const Component = asChild ? Slot : "p";

  return (
    <Component 
      {...props}
      className={`${styles.text} ${className}`}
      style={style}
      data-align={align}
      data-weight={weight}
      data-size={size}
      data-family={family}
    >
      {children}
    </Component>
  );
};