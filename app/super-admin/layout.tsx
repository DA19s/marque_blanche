import { SuperAdminSidebar } from "@/components/super-admin/sidebar"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/super-admin/login")
  }

  return (
    <div className="flex h-screen">
      <SuperAdminSidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  )
}
