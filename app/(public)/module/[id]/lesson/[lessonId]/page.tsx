import { auth } from "@/lib/auth"
import { mockPrisma } from "@/lib/mock-data"
import { redirect, notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Download, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { VideoPlayer } from "@/components/video-player"

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>
}) {
  const session = await auth()

  if (!session || !session.user) {
    redirect("/login")
  }

  const { id, lessonId } = await params

  const module = await mockPrisma.module.findUnique({ where: { id } })
  const lesson = (await mockPrisma.lesson.findMany({ where: { moduleId: id } }))
    .find((l) => l.id === lessonId)

  if (!module || !lesson) {
    notFound()
  }

  // Vérifier l'inscription
  const enrollment = await mockPrisma.enrollment.findUnique({
    where: {
      userId_moduleId: {
        userId: session.user.id,
        moduleId: id,
      },
    },
  })

  if (!enrollment) {
    redirect(`/module/${id}`)
  }

  const lessons = await mockPrisma.lesson.findMany({ 
    where: { moduleId: id } 
  })
  const currentIndex = lessons.findIndex((l) => l.id === lessonId)
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null

  const attachments: Array<{ id: string; name: string; fileUrl: string; fileType: string }> = [] // Mock - à implémenter

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href={`/module/${id}`}>
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au module
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <VideoPlayer url={lesson.videoUrl} />
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {lesson.title}
                  </h1>
                  {lesson.description && (
                    <p className="text-gray-600 mb-6">{lesson.description}</p>
                  )}
                  {lesson.content && (
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: lesson.content }}
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pièces jointes */}
            {attachments.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Pièces jointes</h2>
                  <div className="space-y-2">
                    {attachments.map((attachment) => (
                      <a
                        key={attachment.id}
                        href={attachment.fileUrl}
                        download
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Download className="h-5 w-5 text-gray-600" />
                        <div className="flex-1">
                          <p className="font-medium">{attachment.name}</p>
                          <p className="text-sm text-gray-600">{attachment.fileType}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              {prevLesson ? (
                <Link href={`/module/${id}/lesson/${prevLesson.id}`}>
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Leçon précédente
                  </Button>
                </Link>
              ) : (
                <div />
              )}
              {nextLesson ? (
                <Link href={`/module/${id}/lesson/${nextLesson.id}`}>
                  <Button
                    style={{
                      background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                    }}
                  >
                    Leçon suivante
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Link href={`/module/${id}/quiz`}>
                  <Button
                    style={{
                      background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                    }}
                  >
                    Passer le quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">Leçons du module</h2>
                <div className="space-y-2">
                  {lessons
                    .sort((a, b) => a.order - b.order)
                    .map((l, index) => {
                      const isActive = l.id === lessonId
                      return (
                        <Link
                          key={l.id}
                          href={`/module/${id}/lesson/${l.id}`}
                          className={`block p-3 rounded-lg transition-colors ${
                            isActive
                              ? "bg-gray-100"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-500 w-6">
                              {index + 1}
                            </span>
                            <span className={`text-sm ${isActive ? "font-medium text-gray-900" : "text-gray-600"}`}>
                              {l.title}
                            </span>
                          </div>
                        </Link>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
