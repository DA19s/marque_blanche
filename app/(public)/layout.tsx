import { UserHeader } from "@/components/user/header"
import { UserFooter } from "@/components/user/footer"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { auth } from "@/lib/auth"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const tenantId = session?.user?.tenantId || null

  return (
    <ThemeProvider tenantId={tenantId}>
      <div className="flex min-h-screen flex-col">
        <UserHeader />
        <main className="flex-1">{children}</main>
        <UserFooter />
      </div>
    </ThemeProvider>
  )
}
