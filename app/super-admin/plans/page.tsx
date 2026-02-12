import { auth } from "@/lib/auth"
import { mockPrisma } from "@/lib/mock-data"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Users, HardDrive, BookOpen } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function PlansPage() {
  const session = await auth()

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/login")
  }

  // Statistiques par plan (mockées)
  const planStats = await mockPrisma.tenant.groupBy({
    by: ["planType"],
    _count: {
      id: true,
    },
  })

  const planDetails = {
    FREE: {
      name: "Free",
      maxUsers: 100,
      maxStorage: 1024,
      maxModules: 50,
      description: "Plan gratuit pour tester la plateforme",
    },
    BASIC: {
      name: "Basic",
      maxUsers: 500,
      maxStorage: 5120,
      maxModules: 200,
      description: "Pour les petites organisations",
    },
    PROFESSIONAL: {
      name: "Professional",
      maxUsers: 2000,
      maxStorage: 20480,
      maxModules: 1000,
      description: "Pour les organisations moyennes",
    },
    ENTERPRISE: {
      name: "Enterprise",
      maxUsers: 10000,
      maxStorage: 102400,
      maxModules: 5000,
      description: "Pour les grandes organisations",
    },
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Plans & Quotas
        </h1>
        <p className="text-gray-600 mt-2">
          Gestion des plans tarifaires et des quotas
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {Object.entries(planDetails).map(([key, plan]) => {
          const count = planStats.find((s) => s.planType === key)?._count.id || 0
          return (
            <Card key={key} className="group hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-900">
                  {plan.name}
                  <Badge variant="secondary">{count} tenants</Badge>
                </CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Utilisateurs:</span>
                  <span className="font-medium">{plan.maxUsers.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Stockage:</span>
                  <span className="font-medium">{plan.maxStorage.toLocaleString()} MB</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Modules:</span>
                  <span className="font-medium">{plan.maxModules.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détails des Quotas par Plan</CardTitle>
          <CardDescription>
            Comparaison des limites pour chaque plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Max Utilisateurs</TableHead>
                <TableHead>Max Stockage (MB)</TableHead>
                <TableHead>Max Modules</TableHead>
                <TableHead>Tenants Actifs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(planDetails).map(([key, plan]) => {
                const count = planStats.find((s) => s.planType === key)?._count.id || 0
                return (
                  <TableRow key={key}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>{plan.maxUsers.toLocaleString()}</TableCell>
                    <TableCell>{plan.maxStorage.toLocaleString()}</TableCell>
                    <TableCell>{plan.maxModules.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{count}</Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
