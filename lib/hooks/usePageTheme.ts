// Jelenleg nem használt, csak prototípus
import create from 'zustand';

interface Theme {
  name: string;
  // Add any other properties relevant to your theme
}

interface ThemeStore {
  currentTheme: Theme;
  setTheme: (newTheme: Theme) => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
  currentTheme: { name: 'light' }, // Initial theme, you can set it to any predefined theme
  setTheme: (newTheme) => set({ currentTheme: newTheme }),
}));

export default useThemeStore;
