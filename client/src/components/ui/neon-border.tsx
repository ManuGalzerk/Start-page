import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NeonBorderProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function NeonBorder({ children, className, animate = false }: NeonBorderProps) {
  const baseClasses = "shadow-[0_0_5px_rgba(157,78,221,0.5),_0_0_10px_rgba(157,78,221,0.3)]";
  
  if (!animate) {
    return (
      <div className={cn(baseClasses, className)}>
        {children}
      </div>
    );
  }
  
  return (
    <motion.div
      className={cn(baseClasses, className)}
      animate={{
        boxShadow: [
          "0 0 5px rgba(157, 78, 221, 0.5), 0 0 10px rgba(157, 78, 221, 0.3)",
          "0 0 10px rgba(157, 78, 221, 0.7), 0 0 20px rgba(157, 78, 221, 0.5), 0 0 30px rgba(157, 78, 221, 0.3)",
          "0 0 5px rgba(157, 78, 221, 0.5), 0 0 10px rgba(157, 78, 221, 0.3)"
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      {children}
    </motion.div>
  );
}
