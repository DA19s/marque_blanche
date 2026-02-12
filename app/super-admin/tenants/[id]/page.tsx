import { auth } from "@/lib/auth"
import { mockPrisma, mockUsers } from "@/lib/mock-data"
import { redirect, notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Edit, Users, BookOpen, HardDrive } from "lucide-react"
import { formatDate } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function TenantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/login")
  }

  const { id } = await params
  const tenant = await mockPrisma.tenant.findUnique({
    where: { id },
  })

  if (!tenant) {
    notFound()
  }

  // Mock users pour ce tenant
  const tenantUsers = mockUsers
    .filter((u) => u.tenantId === id)
    .slice(0, 10)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  const usageStats = [
    {
      label: "Utilisateurs",
      current: tenant.currentUsers,
      max: tenant.maxUsers,
      icon: Users,
      percentage: Math.round((tenant.currentUsers / tenant.maxUsers) * 100),
    },
    {
      label: "Modules",
      current: tenant.currentModules,
      max: tenant.maxModules,
      icon: BookOpen,
      percentage: Math.round((tenant.currentModules / tenant.maxModules) * 100),
    },
    {
      label: "Stockage (MB)",
      current: tenant.currentStorage,
      max: tenant.maxStorage,
      icon: HardDrive,
      percentage: Math.round((tenant.currentStorage / tenant.maxStorage) * 100),
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/super-admin/tenants">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{tenant.name}</h1>
            <p className="text-gray-600 mt-2">
              {tenant.slug}.fined.app
              {tenant.domain && ` • ${tenant.domain}`}
            </p>
          </div>
          <Link href={`/super-admin/tenants/${id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {usageStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.current} / {stat.max}
                </div>
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        stat.percentage > 80
                          ? "bg-red-500"
                          : stat.percentage > 60
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(stat.percentage, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.percentage}% utilisé
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Statut:</span>
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
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan:</span>
              <span className="font-medium">{tenant.planType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Créé le:</span>
              <span className="font-medium">{formatDate(tenant.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{tenant.contactEmail || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Téléphone:</span>
              <span className="font-medium">{tenant.contactPhone || "N/A"}</span>
            </div>
            <div className="pt-4 border-t">
              <div className="flex gap-2 items-center mb-2">
                <div
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: tenant.primaryColor }}
                />
                <span className="text-sm text-muted-foreground">Couleur principale</span>
              </div>
              <div className="flex gap-2 items-center">
                <div
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: tenant.secondaryColor }}
                />
                <span className="text-sm text-muted-foreground">Couleur secondaire</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Utilisateurs totaux:</span>
              <span className="font-medium">{tenant._count?.users || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Programmes:</span>
              <span className="font-medium">{tenant._count?.programs || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Modules:</span>
              <span className="font-medium">{tenant._count?.modules || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Derniers Utilisateurs</CardTitle>
          <CardDescription>
            Les 10 derniers utilisateurs créés pour ce tenant
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tenantUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Aucun utilisateur pour le moment
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Créé le</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenantUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name || "N/A"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "ACTIVE"
                            ? "success"
                            : user.status === "SUSPENDED"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
