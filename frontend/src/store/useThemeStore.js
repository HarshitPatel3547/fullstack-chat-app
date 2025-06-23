
import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "light", // Default to light
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
  toggleTheme: () => {
    const newTheme = localStorage.getItem("chat-theme") === "light" ? "dark" : "light";
    localStorage.setItem("chat-theme", newTheme);
    set({ theme: newTheme });
  }
}));