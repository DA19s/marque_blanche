import { NextRequest, NextResponse } from "next/server"
import { mockUsers, mockTenants } from "@/lib/mock-data"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = registerSchema.parse(body)

    // Vérifier si l'email existe déjà
    const existingUser = mockUsers.find((u) => u.email === data.email)
    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      )
    }

    // Pour la démo, on assigne automatiquement au premier tenant actif
    // En production, on déterminerait le tenant depuis le sous-domaine
    const activeTenant = mockTenants.find((t) => t.status === "ACTIVE")
    const tenantId = activeTenant?.id || null

    // Créer l'utilisateur (mocké)
    const newUser = {
      id: String(mockUsers.length + 1),
      email: data.email,
      name: data.name,
      role: "USER" as const,
      status: "ACTIVE",
      tenantId,
      createdAt: new Date(),
    }

    mockUsers.push(newUser)

    return NextResponse.json(
      { message: "Inscription réussie", user: newUser },
      { status: 201 }
    )
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error registering user:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    )
  }
}
