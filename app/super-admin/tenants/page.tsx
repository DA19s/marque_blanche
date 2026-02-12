import { auth } from "@/lib/auth"
import { mockPrisma } from "@/lib/mock-data"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Edit } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default async function TenantsPage() {
  const session = await auth()

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/login")
  }

  const tenants = (await mockPrisma.tenant.findMany()).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  )

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Gestion des Tenants
          </h1>
          <p className="text-gray-600 mt-2">
            Créez et gérez les partenaires de la plateforme
          </p>
        </div>
        <Link href="/super-admin/tenants/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Tenant
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tenants.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Aucun tenant pour le moment. Créez-en un pour commencer.
              </p>
            </CardContent>
          </Card>
        ) : (
          tenants.map((tenant) => (
            <Card key={tenant.id} className="group hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-gray-900">{tenant.name}</CardTitle>
                    <CardDescription className="mt-1 text-gray-600">
                      {tenant.slug}.fined.app
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      tenant.status === "ACTIVE"
                        ? "success"
                        : tenant.status === "SUSPENDED"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {tenant.status === "ACTIVE"
                      ? "Actif"
                      : tenant.status === "SUSPENDED"
                      ? "Suspendu"
                      : "Inactif"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plan:</span>
                    <span className="font-medium">{tenant.planType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Utilisateurs:</span>
                    <span className="font-medium">
                      {tenant._count?.users || 0} / {tenant.maxUsers}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Modules:</span>
                    <span className="font-medium">
                      {tenant._count?.modules || 0} / {tenant.maxModules}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Créé le:</span>
                    <span className="font-medium">{formatDate(tenant.createdAt)}</span>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Link href={`/super-admin/tenants/${tenant.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        Voir
                      </Button>
                    </Link>
                    <Link href={`/super-admin/tenants/${tenant.id}/edit`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
