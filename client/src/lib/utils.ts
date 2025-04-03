import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

export function getRandomQuote(): string {
  const quotes = [
    "\"The best way to predict the future is to create it.\" — Alan Kay",
    "\"Innovation distinguishes between a leader and a follower.\" — Steve Jobs",
    "\"The only way to do great work is to love what you do.\" — Steve Jobs",
    "\"Creativity is intelligence having fun.\" — Albert Einstein",
    "\"The future belongs to those who believe in the beauty of their dreams.\" — Eleanor Roosevelt",
    "\"Simplicity is the ultimate sophistication.\" — Leonardo da Vinci"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch (error) {
    // If URL parsing fails, return a generic icon
    return "";
  }
}

export function getIconBgColor(category: string): string {
  const colors: Record<string, string> = {
    "Work": "from-blue-500 to-blue-600",
    "Personal": "from-purple-500 to-purple-600",
    "Development": "from-gray-700 to-gray-900",
    "Social": "from-blue-400 to-blue-500",
    "Entertainment": "from-red-600 to-red-700",
    "Design": "from-purple-500 to-pink-500",
    "Music": "from-green-500 to-green-600",
    "Communication": "from-indigo-500 to-indigo-600",
    "default": "from-neon-purple to-neon-pink"
  };
  
  return colors[category] || colors.default;
}
