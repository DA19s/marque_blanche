import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { mockPrisma } from "@/lib/mock-data"
import { z } from "zod"

const createTenantSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  domain: z.string().optional(),
  planType: z.enum(["FREE", "BASIC", "PROFESSIONAL", "ENTERPRISE"]),
  maxUsers: z.number().min(1),
  maxStorage: z.number().min(1),
  maxModules: z.number().min(1),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const data = createTenantSchema.parse(body)

    // Vérifier si le slug existe déjà (mocké)
    const allTenants = await mockPrisma.tenant.findMany()
    const existingTenant = allTenants.find((t) => t.slug === data.slug)

    if (existingTenant) {
      return NextResponse.json(
        { error: "Un tenant avec ce slug existe déjà" },
        { status: 400 }
      )
    }

    // Vérifier le domaine si fourni
    if (data.domain) {
      const existingDomain = allTenants.find((t) => t.domain === data.domain)
      if (existingDomain) {
        return NextResponse.json(
          { error: "Ce domaine est déjà utilisé" },
          { status: 400 }
        )
      }
    }

    // Créer le tenant (mocké)
    const tenant = await mockPrisma.tenant.create({
      data: {
        name: data.name,
        slug: data.slug,
        domain: data.domain || null,
        planType: data.planType,
        maxUsers: data.maxUsers,
        maxStorage: data.maxStorage,
        maxModules: data.maxModules,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        contactEmail: data.contactEmail || null,
        contactPhone: data.contactPhone || null,
        status: "ACTIVE",
      },
    })

    return NextResponse.json(tenant, { status: 201 })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error creating tenant:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création du tenant" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const tenants = await mockPrisma.tenant.findMany()

    return NextResponse.json(tenants)
  } catch (error) {
    console.error("Error fetching tenants:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des tenants" },
      { status: 500 }
    )
  }
}
