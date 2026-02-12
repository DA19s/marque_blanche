"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"

export default function ClientLoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Rediriger vers la page d'accueil qui affichera les options de login
    router.push("/")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="py-12 text-center">
          <p className="text-gray-600">Redirection en cours...</p>
        </CardContent>
      </Card>
    </div>
  )
}
