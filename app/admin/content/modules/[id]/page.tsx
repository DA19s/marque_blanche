import { auth } from "@/lib/auth"
import { mockPrisma } from "@/lib/mock-data"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Edit, Trash2, Play } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()

  if (!session || (session.user.role !== "ADMIN_PARTNER" && session.user.role !== "SUPER_ADMIN")) {
    redirect("/login")
  }

  const { id } = await params
  const module = await mockPrisma.module.findUnique({ where: { id } })

  if (!module) {
    notFound()
  }

  const lessons = await mockPrisma.lesson.findMany({ where: { moduleId: id } })
  const quiz = await mockPrisma.quiz.findUnique({ where: { moduleId: id } })

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <Link href="/admin/content">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {module.title}
            </h1>
            <p className="text-gray-600 mt-2">
              {module.description || "Aucune description"}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/content/modules/${id}/edit`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </Button>
            </Link>
            <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="lessons" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lessons">Leçons</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Leçons</CardTitle>
                  <CardDescription>
                    Gérez les leçons de ce module
                  </CardDescription>
                </div>
                <Link href={`/admin/content/modules/${id}/lessons/new`}>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvelle Leçon
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lessons.length === 0 ? (
                  <p className="text-sm text-gray-600 text-center py-8">
                    Aucune leçon pour le moment
                  </p>
                ) : (
                  lessons
                    .sort((a, b) => a.order - b.order)
                    .map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-500 w-8">
                              {lesson.order + 1}
                            </span>
                            <div>
                              <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                              <p className="text-sm text-gray-600">
                                {lesson.duration || 0} min • {lesson.videoUrl ? "Vidéo" : "Texte"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/admin/content/lessons/${lesson.id}/edit`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Quiz</CardTitle>
                  <CardDescription>
                    Quiz d'évaluation pour ce module
                  </CardDescription>
                </div>
                {!quiz && (
                  <Link href={`/admin/content/modules/${id}/quiz/new`}>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Créer un Quiz
                    </Button>
                  </Link>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {quiz ? (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{quiz.title}</h3>
                      <Badge>Score de passage: {quiz.passingScore}%</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {quiz.description || "Aucune description"}
                    </p>
                    <div className="flex gap-2">
                      <Link href={`/admin/content/quiz/${quiz.id}/edit`}>
                        <Button variant="outline">
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier le Quiz
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600 text-center py-8">
                  Aucun quiz pour ce module. Créez-en un pour évaluer vos apprenants.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du Module</CardTitle>
              <CardDescription>
                Configurez les options de ce module
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Statut de publication</p>
                    <p className="text-sm text-gray-600">
                      {module.published ? "Ce module est visible par les utilisateurs" : "Ce module est en brouillon"}
                    </p>
                  </div>
                  <Badge variant={module.published ? "success" : "secondary"}>
                    {module.published ? "Publié" : "Brouillon"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Niveau</p>
                    <p className="text-sm text-gray-600">{module.level || "Non défini"}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Durée estimée</p>
                    <p className="text-sm text-gray-600">{module.duration || 0} minutes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
