import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import WelcomeSection from "@/components/WelcomeSection";
import CategoryTabs from "@/components/CategoryTabs";
import BookmarkGrid from "@/components/BookmarkGrid";
import Footer from "@/components/Footer";
import AddBookmarkModal from "@/components/AddBookmarkModal";
import { useBookmarks } from "@/hooks/useBookmarks";

const Home: React.FC = () => {
  const {
    bookmarks,
    categories,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    isAddModalOpen,
    setIsAddModalOpen,
    handleAddBookmark,
    handleAddCategory,
    isLoading,
  } = useBookmarks();

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-midnight to-deep-purple font-inter text-white overflow-x-hidden">
      <Header onSearchChange={setSearchQuery} onOpenAddModal={openAddModal} />
      
      <main className="flex-grow pt-24 pb-8 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <WelcomeSection onOpenAddModal={openAddModal} />
        
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onAddCategory={handleAddCategory}
        />
        
        {isLoading ? (
          <motion.div 
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-12 h-12 rounded-full border-4 border-neon-purple border-t-transparent animate-spin"></div>
          </motion.div>
        ) : (
          <BookmarkGrid
            bookmarks={bookmarks}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
            onOpenAddModal={openAddModal}
          />
        )}
      </main>
      
      <Footer />
      
      <AddBookmarkModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAdd={handleAddBookmark}
        categories={categories}
      />
    </div>
  );
};

export default Home;
