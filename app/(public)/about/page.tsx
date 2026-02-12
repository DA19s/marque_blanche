import { auth } from "@/lib/auth"
import { mockTenants } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"

export default async function AboutPage() {
  const session = await auth()
  const tenantId = session?.user?.tenantId || null
  const tenant = tenantId ? mockTenants.find((t) => t.id === tenantId) : null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            À propos
          </h1>
        </div>

        <Card>
          <CardContent className="p-8">
            <div 
              className="h-32 w-32 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: "var(--tenant-primary)" }}
            />
            <h2 className="text-2xl font-bold text-center mb-4" style={{ color: "var(--tenant-primary)" }}>
              {tenant?.name || "FinEd"}
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg mb-4">
                {tenant?.aboutText || "Plateforme de formation en ligne de qualité, conçue pour vous accompagner dans votre apprentissage."}
              </p>
              <p className="text-gray-600">
                Notre mission est de rendre l'éducation accessible à tous, avec des contenus de qualité et une expérience d'apprentissage optimale.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Powered by <span className="font-semibold">FinEd</span>
          </p>
        </div>
      </div>
    </div>
  )
}
