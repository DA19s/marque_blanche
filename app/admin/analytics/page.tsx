import { auth } from "@/lib/auth"
import { mockPrisma } from "@/lib/mock-data"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, BookOpen, Award } from "lucide-react"
import { AnalyticsCharts } from "@/components/admin-partner/analytics-charts"

export default async function AnalyticsPage() {
  const session = await auth()

  if (!session || (session.user.role !== "ADMIN_PARTNER" && session.user.role !== "SUPER_ADMIN")) {
    redirect("/login")
  }

  const tenantId = session.user.tenantId
  if (!tenantId) {
    redirect("/login")
  }

  const users = await mockPrisma.user.findMany({ where: { tenantId } })
  const modules = await mockPrisma.module.findMany({ where: { tenantId } })

  // Données mockées pour les graphiques
  const userGrowthData = [
    { month: "Jan", users: 20 },
    { month: "Fév", users: 45 },
    { month: "Mar", users: 60 },
    { month: "Avr", users: 80 },
    { month: "Mai", users: 100 },
    { month: "Juin", users: 127 },
  ]

  const completionData = [
    { module: "Module 1", completions: 85, avgScore: 78 },
    { module: "Module 2", completions: 72, avgScore: 82 },
    { module: "Module 3", completions: 65, avgScore: 75 },
  ]

  const stats = [
    {
      title: "Utilisateurs Inscrits",
      value: users.length,
      change: "+12%",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Utilisateurs Actifs",
      value: Math.round(users.length * 0.78),
      change: "+8%",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Taux de Complétion",
      value: "74%",
      change: "+5%",
      icon: Award,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Score Moyen",
      value: "78%",
      change: "+3%",
      icon: BookOpen,
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-gray-600 mt-2">
          Analysez les performances de votre plateforme
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
                <p className="text-xs text-green-600 mt-1">
                  {stat.change} par rapport au mois dernier
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Graphiques */}
      <AnalyticsCharts 
        userGrowthData={userGrowthData}
        completionData={completionData}
      />
    </div>
  )
}
