import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Bookmark, Category, AddBookmarkFormData } from "@/types";

export function useBookmarks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Fetch bookmarks from API
  const { 
    data: bookmarks = [], 
    isLoading: isLoadingBookmarks 
  } = useQuery({ 
    queryKey: ["/api/bookmarks"] 
  });
  
  // Fetch categories from API
  const { 
    data: categories = [], 
    isLoading: isLoadingCategories 
  } = useQuery({ 
    queryKey: ["/api/categories"] 
  });
  
  // Add bookmark mutation
  const addBookmarkMutation = useMutation({
    mutationFn: (newBookmark: AddBookmarkFormData) =>
      apiRequest("POST", "/api/bookmarks", newBookmark),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookmarks"] });
      setIsAddModalOpen(false);
    },
  });
  
  // Add category mutation
  const addCategoryMutation = useMutation({
    mutationFn: (name: string) =>
      apiRequest("POST", "/api/categories", { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
    },
  });
  
  // Handle adding a new bookmark
  const handleAddBookmark = (bookmarkData: AddBookmarkFormData) => {
    addBookmarkMutation.mutate(bookmarkData);
  };
  
  // Handle adding a new category
  const handleAddCategory = () => {
    const categoryName = prompt("Enter category name:");
    if (categoryName && categoryName.trim() !== "") {
      addCategoryMutation.mutate(categoryName.trim());
    }
  };
  
  return {
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
    isLoading: isLoadingBookmarks || isLoadingCategories,
    isPending: addBookmarkMutation.isPending || addCategoryMutation.isPending,
  };
}
