import { mockTenants } from "./mock-data"
import { headers } from "next/headers"

export async function getTenantFromRequest() {
  const headersList = await headers()
  const host = headersList.get("host") || ""
  
  // Extraire le sous-domaine (ex: ciaivert.fined.app -> ciaivert)
  const subdomain = host.split(".")[0]
  
  if (subdomain && subdomain !== "www" && !host.includes("localhost")) {
    const tenant = mockTenants.find((t) => t.slug === subdomain)
    return tenant || null
  }
  
  return null
}

export function requireSuperAdmin(role: string) {
  if (role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized: Super Admin access required")
  }
}

export function requireAdminOrSuperAdmin(role: string) {
  if (role !== "SUPER_ADMIN" && role !== "ADMIN_PARTNER") {
    throw new Error("Unauthorized: Admin access required")
  }
}
