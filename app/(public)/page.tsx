import { auth } from "@/lib/auth"
import { mockTenants, mockPrisma } from "@/lib/mock-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, BookOpen, Award } from "lucide-react"

export default async function HomePage() {
  const session = await auth()
  const tenantId = session?.user?.tenantId || null
  const tenant = tenantId ? mockTenants.find((t) => t.id === tenantId) : null

  // Récupérer tous les tenants actifs pour afficher les options de connexion
  const activeTenants = mockTenants.filter((t) => t.status === "ACTIVE")

  const featuredModules = tenantId 
    ? (await mockPrisma.module.findMany({ where: { tenantId, published: true } })).slice(0, 3)
    : []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-24 px-4"
        style={{
          background: `linear-gradient(135deg, var(--tenant-primary) 0%, var(--tenant-secondary) 100%)`
        }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            {tenant?.name || "Bienvenue sur FinEd"}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {tenant?.aboutText || "Plateforme de formation en ligne de qualité"}
          </p>
          <div className="flex gap-4 justify-center">
            {!session ? (
              <>
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                    S'inscrire gratuitement
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/catalogue">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Découvrir les modules
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                  Accéder à mon tableau de bord
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
          
          {/* Section de connexion par partenaire */}
          {!session && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Connectez-vous à votre plateforme
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
                {activeTenants.map((t) => (
                  <Link key={t.id} href={`/${t.slug}/login`}>
                    <Card className="hover:shadow-xl transition-all duration-200 cursor-pointer bg-white/10 backdrop-blur border-white/20">
                      <CardHeader>
                        <div 
                          className="h-12 w-12 rounded-lg mb-3 flex items-center justify-center"
                          style={{ backgroundColor: t.primaryColor }}
                        />
                        <CardTitle className="text-lg text-white">{t.name}</CardTitle>
                        <CardDescription className="text-white/80">{t.aboutText || "Plateforme de formation"}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          className="w-full text-white"
                          style={{
                            background: `linear-gradient(to right, ${t.primaryColor}, ${t.secondaryColor})`
                          }}
                        >
                          Se connecter
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modules phares */}
      {featuredModules.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Modules Phares
              </h2>
              <p className="text-gray-600">
                Découvrez nos formations les plus populaires
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredModules.map((module) => (
                <Card key={module.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="h-10 w-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "var(--tenant-primary)" }}
                      >
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <Badge variant="secondary">{module.level || "Tous niveaux"}</Badge>
                    </div>
                    <CardTitle className="text-gray-900">{module.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {module.description || "Aucune description"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>{module.duration || 0} min</span>
                      <span>{module.level || "Niveau non défini"}</span>
                    </div>
                    <Link href={`/module/${module.id}`}>
                      <Button 
                        className="w-full"
                        style={{
                          background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                        }}
                      >
                        Commencer
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/catalogue">
                <Button variant="outline" size="lg">
                  Voir tout le catalogue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div 
                className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "var(--tenant-primary)" }}
              >
                <Play className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vidéos de qualité</h3>
              <p className="text-gray-600">
                Accédez à des contenus vidéo de haute qualité
              </p>
            </div>
            <div className="text-center">
              <div 
                className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "var(--tenant-secondary)" }}
              >
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certifications</h3>
              <p className="text-gray-600">
                Obtenez des certificats après complétion
              </p>
            </div>
            <div className="text-center">
              <div 
                className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "var(--tenant-primary)" }}
              >
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progression suivie</h3>
              <p className="text-gray-600">
                Suivez votre progression en temps réel
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
