import React from "react";
import { GlassContainer } from "@/components/ui/glass-container";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <GlassContainer className="px-6 py-4 text-center text-text-secondary text-sm">
        <p>
          Built with{" "}
          <motion.span
            className="text-neon-pink"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ♥
          </motion.span>{" "}
          using React & TailwindCSS
        </p>
      </GlassContainer>
    </motion.footer>
  );
};

export default Footer;
