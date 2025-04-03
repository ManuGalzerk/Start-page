import React, { useState } from "react";
import { GlassContainer, GlassInput, GlassSelect, GlassButton } from "@/components/ui/glass-container";
import { NeonBorder } from "@/components/ui/neon-border";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Code, Briefcase, User, Heart, MoreHorizontal } from "lucide-react";
import { AddBookmarkFormData, Category } from "@/types";

interface AddBookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (bookmark: AddBookmarkFormData) => void;
  categories: Category[];
}

const AddBookmarkModal: React.FC<AddBookmarkModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  categories,
}) => {
  const [formData, setFormData] = useState<AddBookmarkFormData>({
    name: "",
    url: "",
    category: categories.length > 0 ? categories[0].name : "",
    icon: "globe",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleIconSelect = (icon: string) => {
    setFormData({ ...formData, icon });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      url: "",
      category: categories.length > 0 ? categories[0].name : "",
      icon: "globe",
    });
  };

  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modal = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 500 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: { 
        duration: 0.3 
      } 
    }
  };

  const icons = [
    { name: "globe", component: <Globe size={20} /> },
    { name: "code", component: <Code size={20} /> },
    { name: "briefcase", component: <Briefcase size={20} /> },
    { name: "user", component: <User size={20} /> },
    { name: "heart", component: <Heart size={20} /> },
    { name: "more", component: <MoreHorizontal size={20} /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight bg-opacity-80 backdrop-blur-sm"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="animate-float max-w-md w-full mx-4"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <NeonBorder animate className="rounded-xl">
              <GlassContainer className="rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-raleway font-medium">Add New Bookmark</h2>
                  <motion.button
                    className="text-text-secondary hover:text-white"
                    aria-label="Close modal"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <GlassInput
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg p-2"
                      placeholder="e.g. GitHub"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="url" className="block text-sm font-medium mb-1">
                      URL
                    </label>
                    <GlassInput
                      type="url"
                      id="url"
                      value={formData.url}
                      onChange={handleChange}
                      className="w-full rounded-lg p-2"
                      placeholder="https://..."
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <GlassSelect
                      id="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-lg p-2"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </GlassSelect>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Icon</label>
                    <div className="grid grid-cols-6 gap-2">
                      {icons.map((icon) => (
                        <motion.button
                          key={icon.name}
                          type="button"
                          className={`p-2 rounded-lg ${
                            formData.icon === icon.name
                              ? "bg-neon-purple bg-opacity-30"
                              : "bg-opacity-40 backdrop-blur-sm"
                          } hover:bg-neon-purple hover:bg-opacity-20 active:bg-opacity-30 transition-all`}
                          onClick={() => handleIconSelect(icon.name)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {icon.component}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <motion.button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-neon-purple to-neon-pink text-white py-2 rounded-lg transition-all"
                      whileHover={{ 
                        scale: 1.03, 
                        boxShadow: "0 0 10px rgba(157, 78, 221, 0.7), 0 0 20px rgba(157, 78, 221, 0.5), 0 0 30px rgba(157, 78, 221, 0.3)" 
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Add Bookmark
                    </motion.button>
                    <GlassButton
                      type="button"
                      className="flex-1 py-2 rounded-lg"
                      onClick={onClose}
                    >
                      Cancel
                    </GlassButton>
                  </div>
                </form>
              </GlassContainer>
            </NeonBorder>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddBookmarkModal;
