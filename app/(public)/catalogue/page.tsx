import { auth } from "@/lib/auth"
import { mockPrisma } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, BookOpen, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function CataloguePage() {
  const session = await auth()
  const tenantId = session?.user?.tenantId || null

  const modules = tenantId 
    ? (await mockPrisma.module.findMany({ where: { tenantId, published: true } }))
    : []

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Catalogue de Modules
          </h1>
          <p className="text-gray-600 text-lg">
            Découvrez tous nos modules de formation
          </p>
        </div>

        {/* Recherche et filtres */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Rechercher un module..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
        </div>

        {/* Liste des modules */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="py-12 text-center">
                <p className="text-gray-600">
                  Aucun module disponible pour le moment
                </p>
              </CardContent>
            </Card>
          ) : (
            modules.map((module) => (
              <Card key={module.id} className="group hover:shadow-xl transition-all duration-200 overflow-hidden">
                <div 
                  className="h-32 w-full"
                  style={{ 
                    background: `linear-gradient(135deg, var(--tenant-primary) 0%, var(--tenant-secondary) 100%)` 
                  }}
                />
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{module.level || "Tous niveaux"}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {module.duration || 0} min
                    </div>
                  </div>
                  <CardTitle className="text-gray-900">{module.title}</CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-2">
                    {module.description || "Aucune description"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/module/${module.id}`}>
                    <Button 
                      className="w-full"
                      style={{
                        background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                      }}
                    >
                      Voir le module
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
