import { auth } from "@/lib/auth"
import { mockPrisma, mockTenants } from "@/lib/mock-data"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Activity, TrendingUp } from "lucide-react"

export default async function SuperAdminDashboard() {
  const session = await auth()

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/login")
  }

  // Statistiques globales (mockées)
  const totalTenants = await mockPrisma.tenant.count()
  const activeTenants = await mockPrisma.tenant.count({
    where: { status: "ACTIVE" },
  })
  const totalUsers = await mockPrisma.user.count({
    where: { role: { not: "SUPER_ADMIN" } },
  })
  const totalModules = await mockPrisma.module.count()

  const stats = [
    {
      title: "Tenants Actifs",
      value: activeTenants,
      total: totalTenants,
      icon: Building2,
      description: "Partenaires actifs sur la plateforme",
    },
    {
      title: "Utilisateurs Totaux",
      value: totalUsers,
      icon: Users,
      description: "Tous les utilisateurs (hors super admin)",
    },
    {
      title: "Modules Publiés",
      value: totalModules,
      icon: Activity,
      description: "Contenus disponibles",
    },
    {
      title: "Taux d'Activité",
      value: activeTenants > 0 ? Math.round((activeTenants / totalTenants) * 100) : 0,
      suffix: "%",
      icon: TrendingUp,
      description: "Pourcentage de tenants actifs",
    },
  ]

  // Derniers tenants créés (mockés)
  const recentTenants = (await mockPrisma.tenant.findMany())
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5)

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Dashboard Super Admin
        </h1>
        <p className="text-gray-600 mt-2">
          Vue d'ensemble de la plateforme FinEd
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="group hover:scale-[1.02] transition-transform duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <Icon className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                  {stat.suffix || ""}
                  {stat.total && (
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      / {stat.total}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Derniers tenants */}
      <Card>
        <CardHeader>
          <CardTitle>Derniers Tenants Créés</CardTitle>
          <CardDescription>
            Les 5 derniers partenaires ajoutés à la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTenants.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Aucun tenant pour le moment
              </p>
            ) : (
              recentTenants.map((tenant) => (
                <div
                  key={tenant.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{tenant.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {tenant.slug}.fined.app
                    </p>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{tenant._count?.users || 0} utilisateurs</span>
                      <span>{tenant._count?.modules || 0} modules</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        tenant.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : tenant.status === "SUSPENDED"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {tenant.status === "ACTIVE"
                        ? "Actif"
                        : tenant.status === "SUSPENDED"
                        ? "Suspendu"
                        : "Inactif"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
