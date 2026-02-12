"use client"

import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { mockTenants } from "@/lib/mock-data"

export default function TenantLoginPage() {
  const router = useRouter()
  const params = useParams()
  const tenantSlug = params?.tenantSlug as string
  const { data: session, status } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [tenant, setTenant] = useState<typeof mockTenants[0] | null>(null)

  // Trouver le tenant par son slug
  useEffect(() => {
    const foundTenant = mockTenants.find((t) => t.slug === tenantSlug)
    if (foundTenant) {
      setTenant(foundTenant)
    } else {
      setError("Partenaire introuvable")
    }
  }, [tenantSlug])

  // Rediriger si déjà connecté en tant que Client
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (session.user.role === "USER") {
        router.push("/dashboard")
      } else {
        // Si connecté mais pas Client, rediriger vers la bonne interface
        if (session.user.role === "SUPER_ADMIN") {
          router.push("/super-admin")
        } else if (session.user.role === "ADMIN_PARTNER") {
          router.push("/admin")
        }
      }
    }
  }, [status, session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!tenant) {
      setError("Partenaire introuvable")
      setLoading(false)
      return
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Email ou mot de passe incorrect")
        setLoading(false)
      } else if (result?.ok) {
        // Vérifier que c'est bien un Client et qu'il appartient au bon tenant
        setTimeout(async () => {
          const response = await fetch("/api/auth/session")
          const sessionData = await response.json()
          if (sessionData?.user?.role === "USER") {
            // Vérifier que l'utilisateur appartient au bon tenant
            if (sessionData?.user?.tenantId === tenant.id) {
              router.push("/dashboard")
              router.refresh()
            } else {
              setError(`Ce compte n'appartient pas à ${tenant.name}. Veuillez utiliser la page de connexion appropriée.`)
              setLoading(false)
            }
          } else {
            setError("Accès réservé aux Clients. Utilisez la page de connexion appropriée.")
            setLoading(false)
          }
        }, 200)
      }
    } catch (err) {
      setError("Une erreur est survenue")
      setLoading(false)
    }
  }

  if (!tenant) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <p className="text-red-600">Partenaire introuvable</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ThemeProvider tenantId={tenant.id}>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div 
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">{tenant.name}</CardTitle>
            <CardDescription>
              Connectez-vous à votre compte pour accéder à vos formations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre-email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full text-white" 
                disabled={loading}
                style={{
                  background: `linear-gradient(to right, ${tenant.primaryColor}, ${tenant.secondaryColor})`
                }}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Pas encore de compte ?{" "}
                  <a href={`/${tenantSlug}/register`} className="font-medium hover:underline" style={{ color: tenant.primaryColor }}>
                    S'inscrire
                  </a>
                </p>
                <p className="text-xs text-gray-500">
                  Vous êtes un Admin Partenaire ?{" "}
                  <a href="/admin-login" className="hover:underline" style={{ color: tenant.primaryColor }}>
                    Connexion Admin
                  </a>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  )
}
