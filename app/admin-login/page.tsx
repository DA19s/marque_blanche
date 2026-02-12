"use client"

import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"
import { ThemeProvider } from "@/components/providers/theme-provider"

export default function AdminLoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Rediriger si déjà connecté en tant qu'Admin Partenaire
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (session.user.role === "ADMIN_PARTNER" || session.user.role === "SUPER_ADMIN") {
        if (session.user.role === "SUPER_ADMIN") {
          router.push("/super-admin")
        } else {
          router.push("/admin")
        }
      } else {
        router.push("/dashboard")
      }
    }
  }, [status, session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

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
        // Vérifier que c'est bien un Admin Partenaire
        setTimeout(async () => {
          const response = await fetch("/api/auth/session")
          const sessionData = await response.json()
          if (sessionData?.user?.role === "ADMIN_PARTNER" || sessionData?.user?.role === "SUPER_ADMIN") {
            if (sessionData?.user?.role === "SUPER_ADMIN") {
              router.push("/super-admin")
            } else {
              router.push("/admin")
            }
            router.refresh()
          } else {
            setError("Accès réservé aux Administrateurs Partenaires")
            setLoading(false)
          }
        }, 200)
      }
    } catch (err) {
      setError("Une erreur est survenue")
      setLoading(false)
    }
  }

  return (
    <ThemeProvider tenantId={null}>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div 
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--tenant-primary)" }}
            >
              <Settings className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Partenaire</CardTitle>
            <CardDescription>
              Connexion réservée aux Administrateurs Partenaires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@votre-tenant.sn"
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
                  background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                }}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
              <div className="text-center text-sm text-gray-600">
                <p>Vous êtes un client ?</p>
                <a href="/login" className="font-medium hover:underline" style={{ color: "var(--tenant-primary)" }}>
                  Connexion Client
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  )
}
