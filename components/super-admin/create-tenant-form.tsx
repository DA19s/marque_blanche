"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const tenantSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  slug: z.string().min(1, "Le slug est requis").regex(/^[a-z0-9-]+$/, "Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets"),
  domain: z.string().optional(),
  planType: z.enum(["FREE", "BASIC", "PROFESSIONAL", "ENTERPRISE"]),
  maxUsers: z.number().min(1),
  maxStorage: z.number().min(1),
  maxModules: z.number().min(1),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Couleur invalide"),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Couleur invalide"),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().optional(),
})

type TenantFormData = z.infer<typeof tenantSchema>

export function CreateTenantForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      planType: "FREE",
      maxUsers: 100,
      maxStorage: 1024,
      maxModules: 50,
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
    },
  })

  const planType = watch("planType")

  // Ajuster les quotas selon le plan
  const updateQuotasForPlan = (plan: string) => {
    switch (plan) {
      case "FREE":
        setValue("maxUsers", 100)
        setValue("maxStorage", 1024)
        setValue("maxModules", 50)
        break
      case "BASIC":
        setValue("maxUsers", 500)
        setValue("maxStorage", 5120)
        setValue("maxModules", 200)
        break
      case "PROFESSIONAL":
        setValue("maxUsers", 2000)
        setValue("maxStorage", 20480)
        setValue("maxModules", 1000)
        break
      case "ENTERPRISE":
        setValue("maxUsers", 10000)
        setValue("maxStorage", 102400)
        setValue("maxModules", 5000)
        break
    }
  }

  const onSubmit = async (data: TenantFormData) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/super-admin/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la création")
      }

      router.push("/super-admin/tenants")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Informations du Tenant</CardTitle>
        <CardDescription>
          Remplissez les informations pour créer un nouveau partenaire
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du Partenaire *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="CIAI Vert"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (sous-domaine) *</Label>
              <Input
                id="slug"
                {...register("slug")}
                placeholder="ciaivert"
              />
              {errors.slug && (
                <p className="text-sm text-red-600">{errors.slug.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Utilisé pour {watch("slug") || "slug"}.fined.app
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Domaine Personnalisé (optionnel)</Label>
            <Input
              id="domain"
              {...register("domain")}
              placeholder="academy.partenaire.sn"
            />
            {errors.domain && (
              <p className="text-sm text-red-600">{errors.domain.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="planType">Plan *</Label>
            <Select
              value={planType}
              onValueChange={(value) => {
                setValue("planType", value as any)
                updateQuotasForPlan(value)
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FREE">Free</SelectItem>
                <SelectItem value="BASIC">Basic</SelectItem>
                <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="maxUsers">Max Utilisateurs *</Label>
              <Input
                id="maxUsers"
                type="number"
                {...register("maxUsers", { valueAsNumber: true })}
              />
              {errors.maxUsers && (
                <p className="text-sm text-red-600">{errors.maxUsers.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxStorage">Max Stockage (MB) *</Label>
              <Input
                id="maxStorage"
                type="number"
                {...register("maxStorage", { valueAsNumber: true })}
              />
              {errors.maxStorage && (
                <p className="text-sm text-red-600">{errors.maxStorage.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxModules">Max Modules *</Label>
              <Input
                id="maxModules"
                type="number"
                {...register("maxModules", { valueAsNumber: true })}
              />
              {errors.maxModules && (
                <p className="text-sm text-red-600">{errors.maxModules.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Couleur Principale *</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  {...register("primaryColor")}
                  className="w-20 h-10"
                />
                <Input
                  {...register("primaryColor")}
                  placeholder="#3B82F6"
                />
              </div>
              {errors.primaryColor && (
                <p className="text-sm text-red-600">{errors.primaryColor.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Couleur Secondaire *</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  {...register("secondaryColor")}
                  className="w-20 h-10"
                />
                <Input
                  {...register("secondaryColor")}
                  placeholder="#10B981"
                />
              </div>
              {errors.secondaryColor && (
                <p className="text-sm text-red-600">{errors.secondaryColor.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email de Contact</Label>
              <Input
                id="contactEmail"
                type="email"
                {...register("contactEmail")}
                placeholder="contact@partenaire.sn"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Téléphone de Contact</Label>
              <Input
                id="contactPhone"
                {...register("contactPhone")}
                placeholder="+221 XX XXX XX XX"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Création..." : "Créer le Tenant"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
