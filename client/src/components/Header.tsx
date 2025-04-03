import React, { useState } from "react";
import { GlassContainer, GlassInput } from "@/components/ui/glass-container";
import { NeonBorder } from "@/components/ui/neon-border";
import { motion } from "framer-motion";
import { Settings, Plus, Search } from "lucide-react";

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onOpenAddModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange, onOpenAddModal }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 border-b border-opacity-10 border-neon-purple">
      <GlassContainer className="p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <motion.div
              className="text-2xl font-raleway font-semibold flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-pink">
                NeonDash
              </span>
              <motion.span
                className="ml-1 text-neon-blue"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                •
              </motion.span>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={18} />
              <GlassInput
                type="text"
                className="w-full py-2 pl-10 pr-4 rounded-full focus:ring-2 focus:ring-neon-purple focus:ring-opacity-50 transition-all"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              className="bg-opacity-25 backdrop-blur-md p-2 rounded-full group transition-all hover:bg-neon-purple hover:bg-opacity-20"
              aria-label="Settings"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings size={18} className="text-text-secondary group-hover:text-white transition-colors" />
            </motion.button>
            
            <motion.button
              className="bg-opacity-25 backdrop-blur-md p-2 rounded-full group transition-all hover:bg-neon-purple hover:bg-opacity-20"
              aria-label="Add new"
              onClick={onOpenAddModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={18} className="text-text-secondary group-hover:text-white transition-colors" />
            </motion.button>
            
            <NeonBorder className="w-8 h-8 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-neon-purple to-neon-pink"></div>
            </NeonBorder>
          </div>
        </div>
      </GlassContainer>
    </header>
  );
};

export default Header;
