import { auth } from "@/lib/auth"
import { mockPrisma } from "@/lib/mock-data"
import { redirect, notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Play, CheckCircle2, Circle } from "lucide-react"
import Link from "next/link"

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  const { id } = await params

  const module = await mockPrisma.module.findUnique({ where: { id } })
  if (!module || !module.published) {
    notFound()
  }

  const lessons = await mockPrisma.lesson.findMany({ 
    where: { moduleId: id } 
  })
  const quiz = await mockPrisma.quiz.findUnique({ 
    where: { moduleId: id } 
  })

  // Vérifier l'inscription
  let enrollment = null
  let progress: Array<{ lessonId: string; completed: boolean; progress: number }> = []
  if (session?.user) {
    enrollment = await mockPrisma.enrollment.findUnique({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId: id,
        },
      },
    })
    if (enrollment) {
      progress = await mockPrisma.lessonProgress.findMany({
        where: { userId: session.user.id },
      })
    }
  }

  const completedLessons = progress.filter((p) => 
    lessons.some((l) => l.id === p.lessonId && p.completed)
  ).length
  const totalProgress = lessons.length > 0 
    ? Math.round((completedLessons / lessons.length) * 100) 
    : 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div 
            className="h-64 w-full rounded-xl mb-6 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, var(--tenant-primary) 0%, var(--tenant-secondary) 100%)`
            }}
          >
            <BookOpen className="h-24 w-24 text-white opacity-80" />
          </div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">{module.level || "Tous niveaux"}</Badge>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="h-4 w-4" />
                  {module.duration || 0} min
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {module.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {module.description || "Aucune description"}
              </p>
              {enrollment && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Votre progression</span>
                    <span className="font-medium">{totalProgress}%</span>
                  </div>
                  <Progress value={totalProgress} className="h-3" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leçons */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Leçons</CardTitle>
            <CardDescription>
              {lessons.length} leçon{lessons.length > 1 ? "s" : ""} dans ce module
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lessons
                .sort((a, b) => a.order - b.order)
                .map((lesson, index) => {
                  const lessonProgress = progress.find((p) => p.lessonId === lesson.id)
                  const isCompleted = lessonProgress?.completed || false
                  const canAccess = enrollment !== null

                  return (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        ) : (
                          <Circle className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-500">
                            Leçon {index + 1}
                          </span>
                          {isCompleted && (
                            <Badge variant="success" className="text-xs">Complétée</Badge>
                          )}
                        </div>
                        <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">
                          {lesson.duration || 0} min
                        </p>
                      </div>
                      <div>
                        {canAccess ? (
                          <Link href={`/module/${id}/lesson/${lesson.id}`}>
                            <Button
                              variant={isCompleted ? "outline" : "default"}
                              style={!isCompleted ? {
                                background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                              } : {}}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              {isCompleted ? "Revoir" : "Commencer"}
                            </Button>
                          </Link>
                        ) : (
                          <Button variant="outline" disabled>
                            S'inscrire pour accéder
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>

        {/* Quiz */}
        {quiz && (
          <Card>
            <CardHeader>
              <CardTitle>Quiz d'Évaluation</CardTitle>
              <CardDescription>
                Testez vos connaissances avec ce quiz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{quiz.title}</h3>
                  <p className="text-sm text-gray-600">
                    Score de passage: {quiz.passingScore}%
                  </p>
                </div>
                {enrollment ? (
                  <Link href={`/module/${id}/quiz`}>
                    <Button
                      style={{
                        background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                      }}
                    >
                      Passer le quiz
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" disabled>
                    S'inscrire pour accéder
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bouton d'inscription si non inscrit */}
        {!enrollment && session?.user && (
          <Card className="mt-6">
            <CardContent className="py-6 text-center">
              <p className="text-gray-600 mb-4">
                Inscrivez-vous à ce module pour accéder au contenu
              </p>
              <form action="/api/enroll" method="POST">
                <input type="hidden" name="moduleId" value={id} />
                <Button
                  type="submit"
                  style={{
                    background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                  }}
                >
                  S'inscrire au module
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
