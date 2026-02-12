import { auth } from "@/lib/auth"
import { mockPrisma, mockTenants } from "@/lib/mock-data"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Award, TrendingUp, Play } from "lucide-react"
import Link from "next/link"

export default async function UserDashboard() {
  const session = await auth()

  if (!session || !session.user) {
    // Rediriger vers la page d'accueil qui affichera les options de login
    redirect("/")
  }

  const tenantId = session.user.tenantId
  if (!tenantId) {
    redirect("/")
  }

  const enrollments = await mockPrisma.enrollment.findMany({ 
    where: { userId: session.user.id } 
  })
  const progress = await mockPrisma.lessonProgress.findMany({ 
    where: { userId: session.user.id } 
  })

  const modulesData = await Promise.all(
    enrollments.map(async (e) => {
      const module = await mockPrisma.module.findUnique({ where: { id: e.moduleId } })
      if (!module) return null
      
      const lessons = await mockPrisma.lesson.findMany({ where: { moduleId: e.moduleId } })
      const moduleProgress = progress.filter((p) => 
        lessons.some((l) => l.id === p.lessonId)
      )
      const totalLessons = lessons.length
      const completedLessons = moduleProgress.filter((p) => p.completed).length
      const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

      return {
        module,
        enrollment: e,
        progress: progressPercent,
        completedLessons,
        totalLessons,
      }
    })
  )
  
  const modules = modulesData.filter((m): m is NonNullable<typeof m> => m !== null)

  const stats = [
    {
      title: "Modules Inscrits",
      value: enrollments.length,
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Modules Complétés",
      value: enrollments.filter((e) => e.completedAt).length,
      icon: Award,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Progression Moyenne",
      value: modules.length > 0 
        ? `${Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / modules.length)}%`
        : "0%",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Mon Tableau de bord
          </h1>
          <p className="text-gray-600">
            Bienvenue {session.user.name || session.user.email}
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
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
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Modules en cours */}
        <Card>
          <CardHeader>
            <CardTitle>Mes Modules</CardTitle>
            <CardDescription>
              Continuez votre apprentissage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {modules.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Vous n'êtes inscrit à aucun module</p>
                  <Link href="/catalogue">
                    <Button
                      style={{
                        background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                      }}
                    >
                      Découvrir les modules
                    </Button>
                  </Link>
                </div>
              ) : (
                modules.map(({ module, progress, completedLessons, totalLessons }) => {
                  if (!module) return null
                  return (
                    <div
                      key={module.id}
                      className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {module.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {module.description || "Aucune description"}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <span>{module.level || "Tous niveaux"}</span>
                            <span>•</span>
                            <span>{module.duration || 0} min</span>
                            <span>•</span>
                            <span>{completedLessons} / {totalLessons} leçons complétées</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progression</span>
                              <span className="font-medium">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/module/${module.id}`} className="flex-1">
                          <Button 
                            className="w-full"
                            style={{
                              background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                            }}
                          >
                            {progress > 0 ? (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Continuer
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Commencer
                              </>
                            )}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
