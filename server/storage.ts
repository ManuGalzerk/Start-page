import { 
  bookmarks, 
  categories, 
  type Bookmark, 
  type InsertBookmark, 
  type Category, 
  type InsertCategory 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getBookmarks(): Promise<Bookmark[]>;
  getBookmark(id: number): Promise<Bookmark | undefined>;
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  deleteBookmark(id: number): Promise<void>;
  
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  deleteCategory(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Bookmark methods
  async getBookmarks(): Promise<Bookmark[]> {
    return await db.select().from(bookmarks);
  }

  async getBookmark(id: number): Promise<Bookmark | undefined> {
    const result = await db.select().from(bookmarks).where(eq(bookmarks.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async createBookmark(insertBookmark: InsertBookmark): Promise<Bookmark> {
    const result = await db.insert(bookmarks).values(insertBookmark).returning();
    return result[0];
  }

  async deleteBookmark(id: number): Promise<void> {
    await db.delete(bookmarks).where(eq(bookmarks.id, id));
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getCategoryByName(name: string): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.name, name));
    return result.length > 0 ? result[0] : undefined;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    // Check if category already exists
    const existing = await this.getCategoryByName(insertCategory.name);
    if (existing) {
      return existing;
    }
    
    const result = await db.insert(categories).values(insertCategory).returning();
    return result[0];
  }

  async deleteCategory(id: number): Promise<void> {
    await db.delete(categories).where(eq(categories.id, id));
  }
  
  // Initialize default data if needed
  async initializeDefaultData(): Promise<void> {
    const existingCategories = await this.getCategories();
    
    // Only initialize if no categories exist
    if (existingCategories.length === 0) {
      // Add default categories
      const defaultCategories: InsertCategory[] = [
        { name: "Work" },
        { name: "Personal" },
        { name: "Development" },
        { name: "Social" },
        { name: "Entertainment" },
        { name: "Design" },
        { name: "Music" },
        { name: "Communication" }
      ];
      
      // Add default bookmarks
      const defaultBookmarks: InsertBookmark[] = [
        { name: "GitHub", url: "https://github.com", category: "Development", icon: "github" },
        { name: "Gmail", url: "https://mail.google.com", category: "Work", icon: "gmail" },
        { name: "YouTube", url: "https://youtube.com", category: "Entertainment", icon: "youtube" },
        { name: "Twitter", url: "https://twitter.com", category: "Social", icon: "twitter" },
        { name: "Figma", url: "https://figma.com", category: "Design", icon: "figma" },
        { name: "Spotify", url: "https://spotify.com", category: "Music", icon: "spotify" },
        { name: "VS Code", url: "https://code.visualstudio.com", category: "Development", icon: "code" },
        { name: "Reddit", url: "https://reddit.com", category: "Social", icon: "reddit" },
        { name: "Netflix", url: "https://netflix.com", category: "Entertainment", icon: "netflix" },
        { name: "Discord", url: "https://discord.com", category: "Communication", icon: "discord" },
        { name: "Slack", url: "https://slack.com", category: "Work", icon: "slack" }
      ];
      
      // Add categories first
      for (const category of defaultCategories) {
        await this.createCategory(category);
      }
      
      // Then add bookmarks
      for (const bookmark of defaultBookmarks) {
        await this.createBookmark(bookmark);
      }
    }
  }
}

// Initialize database storage and export
const storage = new DatabaseStorage();

// Initialize default data in the background
(async () => {
  try {
    await storage.initializeDefaultData();
    console.log("Database initialized with default data (if needed)");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
})();

export { storage };
