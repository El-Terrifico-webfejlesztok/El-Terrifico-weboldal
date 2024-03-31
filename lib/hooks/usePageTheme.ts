
// Nincs használatba véve
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { themes } from '@/tailwind.config'

type Theme = typeof themes[number];

const initialState: Theme = themes[0]

export const themeStore = create<Theme>()(
  persist(() => initialState, {
    name: 'themeStore'
  })
)

export default function usePageTheme() {
  const theme = themeStore();

  return {
    theme,

    setTheme: (theme: Theme) => {
      themeStore.setState(theme)
    }
  }
}
