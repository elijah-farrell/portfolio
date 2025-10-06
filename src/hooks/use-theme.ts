import { useTheme as useNextThemes } from "next-themes"

// Export useTheme hook
export const useTheme = () => {
  const { theme, setTheme, resolvedTheme } = useNextThemes()
  return { theme, setTheme, resolvedTheme }
}
