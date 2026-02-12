"use client"

import { useEffect } from "react"
import { getTenantTheme, hexToHsl } from "@/lib/theme"

interface ThemeProviderProps {
  tenantId: string | null
  children: React.ReactNode
}

export function ThemeProvider({ tenantId, children }: ThemeProviderProps) {
  useEffect(() => {
    const theme = getTenantTheme(tenantId)
    
    // Appliquer les couleurs CSS variables
    const root = document.documentElement
    root.style.setProperty("--tenant-primary", theme.primaryColor)
    root.style.setProperty("--tenant-secondary", theme.secondaryColor)
    root.style.setProperty("--tenant-primary-hsl", hexToHsl(theme.primaryColor))
    root.style.setProperty("--tenant-secondary-hsl", hexToHsl(theme.secondaryColor))
    root.style.setProperty("--tenant-font", theme.fontFamily)
  }, [tenantId])

  return <>{children}</>
}
