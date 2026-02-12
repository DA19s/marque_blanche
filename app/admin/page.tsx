import { auth } from "@/lib/auth"
import { mockPrisma, mockTenants } from "@/lib/mock-data"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, TrendingUp, Award } from "lucide-react"

export default async function AdminDashboard() {
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

  // Statistiques pour ce tenant
  const totalUsers = (await mockPrisma.user.findMany({ where: { tenantId } })).length
  const totalModules = (await mockPrisma.module.findMany({ where: { tenantId } })).length
  const totalPrograms = (await mockPrisma.program.findMany({ where: { tenantId } })).length

  const stats = [
    {
      title: "Utilisateurs Actifs",
      value: totalUsers,
      icon: Users,
      description: "Total des utilisateurs inscrits",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Modules Publiés",
      value: totalModules,
      icon: BookOpen,
      description: "Contenus disponibles",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Programmes",
      value: totalPrograms,
      icon: Award,
      description: "Collections de modules",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Taux d'Engagement",
      value: "78%",
      icon: TrendingUp,
      description: "Utilisateurs actifs cette semaine",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Dashboard Admin
        </h1>
        <p className="text-gray-600 mt-2">
          Bienvenue sur votre tableau de bord, {tenant.name}
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
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} opacity-90 group-hover:opacity-100 transition-opacity`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Activité récente */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Modules Récents</CardTitle>
            <CardDescription>
              Vos derniers modules créés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(await mockPrisma.module.findMany({ where: { tenantId } }))
                .slice(0, 3)
                .map((module) => (
                  <div key={module.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <h3 className="font-medium text-gray-900">{module.title}</h3>
                      <p className="text-sm text-gray-600">{module.level || "Niveau non défini"}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      module.published 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {module.published ? "Publié" : "Brouillon"}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs Récents</CardTitle>
            <CardDescription>
              Derniers utilisateurs inscrits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(await mockPrisma.user.findMany({ where: { tenantId } }))
                .slice(0, 3)
                .map((user) => (
                  <div key={user.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <h3 className="font-medium text-gray-900">{user.name || user.email}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.status === "ACTIVE" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {user.status}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
