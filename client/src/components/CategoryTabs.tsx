import React from "react";
import { motion } from "framer-motion";
import { Category } from "@/types";
import { PlusIcon } from "lucide-react";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onAddCategory: () => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  onAddCategory,
}) => {
  // Add "All" as a default category
  const allCategories = [{ id: 0, name: "All" }, ...categories];

  return (
    <div className="category-tabs mb-6 flex flex-wrap items-center justify-start gap-x-6 gap-y-2">
      {allCategories.map((category) => (
        <motion.button
          key={category.id}
          className={`tab text-sm font-medium px-1 py-1 border-b-2 transition-all ${
            activeCategory === category.name
              ? "active text-white border-neon-purple"
              : "text-text-secondary border-transparent hover:text-white"
          }`}
          onClick={() => setActiveCategory(category.name)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.name}
        </motion.button>
      ))}
      
      <motion.button
        className="tab text-text-secondary text-sm font-medium px-1 py-1 flex items-center gap-1 hover:text-white transition-all"
        onClick={onAddCategory}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <PlusIcon size={16} /> New Category
      </motion.button>
    </div>
  );
};

export default CategoryTabs;
