"use client"

import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function SuperAdminLoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Rediriger si déjà connecté en tant que Super Admin
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (session.user.role === "SUPER_ADMIN") {
        router.push("/super-admin")
      } else {
        // Si connecté mais pas Super Admin, rediriger vers la bonne interface
        if (session.user.role === "ADMIN_PARTNER") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
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
        // Vérifier que c'est bien un Super Admin
        setTimeout(async () => {
          const response = await fetch("/api/auth/session")
          const sessionData = await response.json()
          if (sessionData?.user?.role === "SUPER_ADMIN") {
            router.push("/super-admin")
            router.refresh()
          } else {
            setError("Accès réservé aux Super Administrateurs")
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <Card className="w-full max-w-md border-gray-700 bg-gray-800 text-white">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Super Admin FinEd</CardTitle>
          <CardDescription className="text-gray-400">
            Connexion réservée aux Super Administrateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@fined.app"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            {error && (
              <div className="rounded-lg bg-red-900/50 p-3 text-sm text-red-200">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
            <div className="text-center text-sm text-gray-400">
              <p>Vous êtes un Admin Partenaire ?</p>
              <a href="/admin-login" className="text-blue-400 hover:underline">
                Connexion Admin Partenaire
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
