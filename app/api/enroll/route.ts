import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { mockEnrollments, mockModules } from "@/lib/mock-data"
import { z } from "zod"

const enrollSchema = z.object({
  moduleId: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const data = enrollSchema.parse(body)

    // Vérifier si le module existe
    const module = mockModules.find((m) => m.id === data.moduleId)
    if (!module) {
      return NextResponse.json(
        { error: "Module not found" },
        { status: 404 }
      )
    }

    // Vérifier si déjà inscrit
    const existing = mockEnrollments.find(
      (e) => e.userId === session.user.id && e.moduleId === data.moduleId
    )
    if (existing) {
      return NextResponse.json(
        { error: "Already enrolled" },
        { status: 400 }
      )
    }

    // Créer l'inscription (mocké)
    const enrollment = {
      id: String(mockEnrollments.length + 1),
      userId: session.user.id,
      moduleId: data.moduleId,
      accessType: "free",
      code: null,
      enrolledAt: new Date(),
      completedAt: null,
    }

    mockEnrollments.push(enrollment)

    return NextResponse.json(enrollment, { status: 201 })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error enrolling:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    )
  }
}
