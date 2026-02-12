import { AdminPartnerSidebar } from "@/components/admin-partner/sidebar"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ThemeProvider } from "@/components/providers/theme-provider"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || (session.user.role !== "ADMIN_PARTNER" && session.user.role !== "SUPER_ADMIN")) {
    redirect("/admin-login")
  }

  return (
    <ThemeProvider tenantId={session.user.tenantId}>
      <div className="flex h-screen">
        <AdminPartnerSidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}
