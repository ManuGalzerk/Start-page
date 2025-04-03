import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookmarkSchema, insertCategorySchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = express.Router();
  
  // Bookmarks API
  apiRouter.get("/bookmarks", async (req, res) => {
    try {
      const bookmarks = await storage.getBookmarks();
      res.json(bookmarks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookmarks" });
    }
  });
  
  apiRouter.post("/bookmarks", async (req, res) => {
    try {
      const bookmarkData = insertBookmarkSchema.parse(req.body);
      const bookmark = await storage.createBookmark(bookmarkData);
      res.status(201).json(bookmark);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create bookmark" });
    }
  });
  
  apiRouter.delete("/bookmarks/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      await storage.deleteBookmark(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete bookmark" });
    }
  });
  
  // Categories API
  apiRouter.get("/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  
  apiRouter.post("/categories", async (req, res) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create category" });
    }
  });
  
  apiRouter.delete("/categories/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      await storage.deleteCategory(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete category" });
    }
  });
  
  // Mount API routes
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  
  return httpServer;
}
