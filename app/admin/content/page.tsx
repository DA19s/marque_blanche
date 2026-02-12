import { auth } from "@/lib/auth"
import { mockPrisma, mockTenants } from "@/lib/mock-data"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, BookOpen, FileText, Edit, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ContentPage() {
  const session = await auth()

  if (!session || (session.user.role !== "ADMIN_PARTNER" && session.user.role !== "SUPER_ADMIN")) {
    redirect("/login")
  }

  const tenantId = session.user.tenantId
  if (!tenantId) {
    redirect("/login")
  }

  const programs = await mockPrisma.program.findMany({ where: { tenantId } })
  const allModules = await mockPrisma.module.findMany({ where: { tenantId } })
  
  // Séparer les modules par programme
  const modulesByProgram = programs.map(program => ({
    program,
    modules: allModules.filter(m => m.programId === program.id)
  }))
  
  // Modules indépendants (sans programme)
  const independentModules = allModules.filter(m => !m.programId)

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Gestion du Contenu
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez vos programmes, modules et leçons
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/content/programs/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Programme
            </Button>
          </Link>
          <Link href="/admin/content/modules/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Module
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        {/* Programmes avec leurs modules */}
        {modulesByProgram.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Programmes</h2>
              <Badge variant="secondary">{modulesByProgram.length} programme{modulesByProgram.length > 1 ? 's' : ''}</Badge>
            </div>
            
            {modulesByProgram.map(({ program, modules }) => (
              <Card key={program.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="h-5 w-5 text-gray-600" />
                        <CardTitle className="text-xl text-gray-900">{program.title}</CardTitle>
                        <Badge variant={program.published ? "success" : "secondary"}>
                          {program.published ? "Publié" : "Brouillon"}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-600">
                        {program.description || "Aucune description"}
                      </CardDescription>
                      <p className="text-sm text-gray-500 mt-2">
                        {modules.length} module{modules.length > 1 ? 's' : ''} dans ce programme
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/content/programs/${program.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {modules.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">Aucun module dans ce programme</p>
                      <Link href={`/admin/content/modules/new?programId=${program.id}`}>
                        <Button variant="outline" size="sm" className="mt-4">
                          <Plus className="mr-2 h-4 w-4" />
                          Ajouter un module
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {modules
                        .sort((a, b) => a.order - b.order)
                        .map((module) => (
                          <Card key={module.id} className="border-l-4" style={{ borderLeftColor: "var(--tenant-primary)" }}>
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-base text-gray-900">{module.title}</CardTitle>
                                  <CardDescription className="text-gray-600 text-xs mt-1">
                                    {module.level || "Niveau non défini"} • {module.duration || 0} min
                                  </CardDescription>
                                </div>
                                <Badge variant={module.published ? "success" : "secondary"} className="text-xs">
                                  {module.published ? "Publié" : "Brouillon"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex gap-2">
                                <Link href={`/admin/content/modules/${module.id}`} className="flex-1">
                                  <Button variant="outline" size="sm" className="w-full">
                                    <FileText className="mr-2 h-3 w-3" />
                                    Voir
                                  </Button>
                                </Link>
                                <Link href={`/admin/content/modules/${module.id}/edit`}>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                </Link>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Modules indépendants (sans programme) */}
        {independentModules.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Modules Indépendants</h2>
              <Badge variant="secondary">{independentModules.length} module{independentModules.length > 1 ? 's' : ''}</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {independentModules.map((module) => (
                <Card key={module.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-gray-900">{module.title}</CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                          {module.level || "Niveau non défini"} • {module.duration || 0} min
                        </CardDescription>
                      </div>
                      <Badge variant={module.published ? "success" : "secondary"}>
                        {module.published ? "Publié" : "Brouillon"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Link href={`/admin/content/modules/${module.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          <FileText className="mr-2 h-4 w-4" />
                          Voir
                        </Button>
                      </Link>
                      <Link href={`/admin/content/modules/${module.id}/edit`}>
                        <Button variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Message si aucun contenu */}
        {modulesByProgram.length === 0 && independentModules.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">
                Aucun contenu pour le moment. Créez un programme ou un module pour commencer.
              </p>
              <div className="flex gap-2 justify-center">
                <Link href="/admin/content/programs/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau Programme
                  </Button>
                </Link>
                <Link href="/admin/content/modules/new">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau Module
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
