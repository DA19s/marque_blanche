import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, AlertTriangle, Activity } from "lucide-react"

export default async function SecurityPage() {
  const session = await auth()

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/login")
  }

  const securityFeatures = [
    {
      title: "Authentification",
      description: "Système d'authentification sécurisé avec JWT et sessions",
      icon: Lock,
      status: "Actif",
    },
    {
      title: "Isolation Multi-Tenant",
      description: "Séparation stricte des données par tenant_id",
      icon: Shield,
      status: "Actif",
    },
    {
      title: "Logs d'Audit",
      description: "Enregistrement de toutes les actions administratives",
      icon: Activity,
      status: "À implémenter",
    },
    {
      title: "Rate Limiting",
      description: "Protection contre les attaques par force brute",
      icon: AlertTriangle,
      status: "À implémenter",
    },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Sécurité
        </h1>
        <p className="text-gray-600 mt-2">
          Gestion de la sécurité globale de la plateforme
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {securityFeatures.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title} className="group hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-gray-900">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Statut:</span>
                  <span
                    className={`text-sm font-medium ${
                      feature.status === "Actif"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {feature.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recommandations de Sécurité</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Activer le chiffrement au repos pour la base de données</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Configurer HTTPS obligatoire en production</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Implémenter un système de logs d'audit complet</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Mettre en place un rate limiting par IP</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Configurer des sauvegardes automatiques quotidiennes</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
