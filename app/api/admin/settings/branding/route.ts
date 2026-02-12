import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { mockTenants } from "@/lib/mock-data"
import { z } from "zod"

const brandingSchema = z.object({
  name: z.string().min(1),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  aboutText: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  legalMentions: z.string().optional(),
})

export async function PUT(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== "ADMIN_PARTNER") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const tenantId = session.user.tenantId
    if (!tenantId) {
      return NextResponse.json(
        { error: "No tenant associated" },
        { status: 400 }
      )
    }

    const body = await req.json()
    const data = brandingSchema.parse(body)

    // Mettre à jour le tenant (mocké)
    const tenantIndex = mockTenants.findIndex((t) => t.id === tenantId)
    if (tenantIndex === -1) {
      return NextResponse.json(
        { error: "Tenant not found" },
        { status: 404 }
      )
    }

    mockTenants[tenantIndex] = {
      ...mockTenants[tenantIndex],
      ...data,
      updatedAt: new Date(),
    }

    return NextResponse.json(mockTenants[tenantIndex])
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error updating branding:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    )
  }
}
