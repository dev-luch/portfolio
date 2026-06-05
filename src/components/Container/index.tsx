import { ReactNode } from "react"
import styles from "./styles.module.css"

export const Container = ({ children, flexDirection="row", className="" }: { 
  children: ReactNode; 
  flexDirection?: "row" | "column";
  className?: string;
}) => {
  return (
    <div className={`${styles.container} ${className}`} style={{ flexDirection }}>
      {children}
    </div>
  )
}
