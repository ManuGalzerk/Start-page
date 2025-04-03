import React from "react";
import BookmarkCard from "@/components/BookmarkCard";
import { Bookmark } from "@/types";
import { motion } from "framer-motion";
import { PlusIcon } from "lucide-react";

interface BookmarkGridProps {
  bookmarks: Bookmark[];
  searchQuery: string;
  activeCategory: string;
  onOpenAddModal: () => void;
}

const BookmarkGrid: React.FC<BookmarkGridProps> = ({
  bookmarks,
  searchQuery,
  activeCategory,
  onOpenAddModal,
}) => {
  const handleOpenUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      bookmark.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by category
    const matchesCategory =
      activeCategory === "All" || bookmark.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredBookmarks.map((bookmark) => (
        <motion.div key={bookmark.id} variants={itemVariants}>
          <BookmarkCard bookmark={bookmark} onClick={handleOpenUrl} />
        </motion.div>
      ))}

      {/* Add New Bookmark Card */}
      <motion.div
        className="group cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        onClick={onOpenAddModal}
        variants={itemVariants}
      >
        <div className="bg-opacity-25 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center h-full border border-dashed border-neon-purple border-opacity-30 hover:border-opacity-100 transition-all duration-300">
          <div className="mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-neon-purple bg-opacity-20">
            <PlusIcon className="text-2xl text-neon-purple" />
          </div>
          <h3 className="text-center text-sm font-medium mb-1 text-neon-purple">
            Add New
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookmarkGrid;
