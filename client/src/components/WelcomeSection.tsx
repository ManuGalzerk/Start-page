import React, { useEffect, useState } from "react";
import { GlassContainer, GlassButton } from "@/components/ui/glass-container";
import { motion } from "framer-motion";
import { getTimeOfDay, getRandomQuote } from "@/lib/utils";

interface WelcomeSectionProps {
  onOpenAddModal: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onOpenAddModal }) => {
  const [typedText, setTypedText] = useState("");
  const [quote, setQuote] = useState("");
  const userName = "Alex"; // This could be from user settings in a full app
  
  const greeting = `Good ${getTimeOfDay()}, ${userName}`;

  useEffect(() => {
    setQuote(getRandomQuote());
    
    // Type writer effect
    let i = 0;
    const typeWriter = () => {
      if (i < greeting.length) {
        setTypedText(greeting.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    setTimeout(typeWriter, 500);
  }, []);

  return (
    <section className="mb-10">
      <GlassContainer className="rounded-xl p-6 md:p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-raleway font-light mb-2 typing-animation">
            {typedText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              |
            </motion.span>
          </h1>
          <p className="text-text-secondary max-w-2xl">
            {quote}
          </p>
          <div className="flex mt-4 space-x-3">
            <motion.button 
              className="px-4 py-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-sm font-medium transition-all"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 10px rgba(157, 78, 221, 0.7), 0 0 20px rgba(157, 78, 221, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenAddModal}
            >
              New Bookmark
            </motion.button>
            <GlassButton className="px-4 py-2 rounded-full text-sm font-medium">
              Explore
            </GlassButton>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute -bottom-8 -right-8 w-40 h-40 bg-neon-purple rounded-full opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute -top-8 -left-8 w-40 h-40 bg-neon-pink rounded-full opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1 
          }}
        />
      </GlassContainer>
    </section>
  );
};

export default WelcomeSection;
