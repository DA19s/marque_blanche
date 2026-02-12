import { auth } from "@/lib/auth"
import { mockTenants } from "@/lib/mock-data"
import { redirect } from "next/navigation"
import { BrandingSettings } from "@/components/admin-partner/branding-settings"

export default async function SettingsPage() {
  const session = await auth()

  if (!session || (session.user.role !== "ADMIN_PARTNER" && session.user.role !== "SUPER_ADMIN")) {
    redirect("/login")
  }

  const tenantId = session.user.tenantId
  if (!tenantId) {
    redirect("/login")
  }

  const tenant = mockTenants.find((t) => t.id === tenantId)
  if (!tenant) {
    redirect("/login")
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Paramètres & Branding
        </h1>
        <p className="text-gray-600 mt-2">
          Personnalisez l'apparence de votre plateforme
        </p>
      </div>

      <BrandingSettings tenant={tenant} />
    </div>
  )
}
