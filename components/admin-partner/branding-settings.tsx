"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MockTenant } from "@/lib/mock-data"
import { Palette, Image, FileText, Mail, Phone, Eye, RefreshCw } from "lucide-react"
import { hexToHsl } from "@/lib/theme"

const brandingSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Couleur invalide"),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Couleur invalide"),
  aboutText: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  legalMentions: z.string().optional(),
})

type BrandingFormData = z.infer<typeof brandingSchema>

interface BrandingSettingsProps {
  tenant: MockTenant
}

// Palettes de couleurs prédéfinies
const colorPalettes = [
  { name: "Vert Nature", primary: "#10B981", secondary: "#059669" },
  { name: "Bleu Océan", primary: "#3B82F6", secondary: "#2563EB" },
  { name: "Rouge Énergie", primary: "#EF4444", secondary: "#DC2626" },
  { name: "Violet Créatif", primary: "#8B5CF6", secondary: "#7C3AED" },
  { name: "Orange Dynamique", primary: "#F97316", secondary: "#EA580C" },
  { name: "Rose Élégant", primary: "#EC4899", secondary: "#DB2777" },
  { name: "Cyan Moderne", primary: "#06B6D4", secondary: "#0891B2" },
  { name: "Ambre Chaleureux", primary: "#F59E0B", secondary: "#D97706" },
]

export function BrandingSettings({ tenant }: BrandingSettingsProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BrandingFormData>({
    resolver: zodResolver(brandingSchema),
    defaultValues: {
      name: tenant.name,
      primaryColor: tenant.primaryColor,
      secondaryColor: tenant.secondaryColor,
      aboutText: tenant.aboutText || "",
      contactEmail: tenant.contactEmail || "",
      contactPhone: tenant.contactPhone || "",
      legalMentions: tenant.legalMentions || "",
    },
  })

  const primaryColor = watch("primaryColor")
  const secondaryColor = watch("secondaryColor")
  const name = watch("name")

  // Mettre à jour les variables CSS en temps réel pour l'aperçu
  useEffect(() => {
    if (primaryColor && secondaryColor) {
      const primaryHsl = hexToHsl(primaryColor)
      const secondaryHsl = hexToHsl(secondaryColor)
      
      document.documentElement.style.setProperty("--tenant-primary", primaryColor)
      document.documentElement.style.setProperty("--tenant-secondary", secondaryColor)
      if (primaryHsl) {
        document.documentElement.style.setProperty("--tenant-primary-hsl", primaryHsl)
      }
      if (secondaryHsl) {
        document.documentElement.style.setProperty("--tenant-secondary-hsl", secondaryHsl)
      }
    }
  }, [primaryColor, secondaryColor])

  const applyPalette = (palette: typeof colorPalettes[0]) => {
    setValue("primaryColor", palette.primary)
    setValue("secondaryColor", palette.secondary)
  }

  const resetColors = () => {
    setValue("primaryColor", tenant.primaryColor)
    setValue("secondaryColor", tenant.secondaryColor)
  }

  const onSubmit = async (data: BrandingFormData) => {
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await fetch("/api/admin/settings/branding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la mise à jour")
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
      
      // Mettre à jour les variables CSS pour l'aperçu en temps réel
      const primaryHsl = hexToHsl(data.primaryColor)
      const secondaryHsl = hexToHsl(data.secondaryColor)
      
      document.documentElement.style.setProperty("--tenant-primary", data.primaryColor)
      document.documentElement.style.setProperty("--tenant-secondary", data.secondaryColor)
      if (primaryHsl) {
        document.documentElement.style.setProperty("--tenant-primary-hsl", primaryHsl)
      }
      if (secondaryHsl) {
        document.documentElement.style.setProperty("--tenant-secondary-hsl", secondaryHsl)
      }
      
      // Recharger la page pour appliquer les changements partout
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tabs defaultValue="branding" className="space-y-4">
      <TabsList>
        <TabsTrigger value="branding">
          <Palette className="mr-2 h-4 w-4" />
          Branding
        </TabsTrigger>
        <TabsTrigger value="content">
          <FileText className="mr-2 h-4 w-4" />
          Contenu
        </TabsTrigger>
        <TabsTrigger value="contact">
          <Mail className="mr-2 h-4 w-4" />
          Contact
        </TabsTrigger>
      </TabsList>

      <TabsContent value="branding">
        <Card>
          <CardHeader>
            <CardTitle>Couleurs & Identité</CardTitle>
            <CardDescription>
              Personnalisez les couleurs de votre plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de la Plateforme</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Nom de votre plateforme"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Palettes prédéfinies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Palettes de couleurs prédéfinies</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={resetColors}
                  >
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Réinitialiser
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {colorPalettes.map((palette) => (
                    <button
                      key={palette.name}
                      type="button"
                      onClick={() => applyPalette(palette)}
                      className="group relative p-3 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-all hover:shadow-md bg-white"
                    >
                      <div className="flex gap-1 mb-2">
                        <div
                          className="w-8 h-8 rounded shadow-sm"
                          style={{ backgroundColor: palette.primary }}
                          title={palette.primary}
                        />
                        <div
                          className="w-8 h-8 rounded shadow-sm"
                          style={{ backgroundColor: palette.secondary }}
                          title={palette.secondary}
                        />
                      </div>
                      <p className="text-xs text-gray-600 group-hover:text-gray-900 font-medium text-center">
                        {palette.name}
                      </p>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Cliquez sur une palette pour l'appliquer instantanément
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Couleur Principale</Label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Input
                        id="primaryColor"
                        type="color"
                        {...register("primaryColor")}
                        className="w-16 h-12 cursor-pointer border-2 rounded-lg"
                        style={{ 
                          backgroundColor: primaryColor,
                          borderColor: primaryColor 
                        }}
                      />
                    </div>
                    <Input
                      {...register("primaryColor")}
                      placeholder="#10B981"
                      className="flex-1"
                    />
                  </div>
                  {errors.primaryColor && (
                    <p className="text-sm text-red-600">{errors.primaryColor.message}</p>
                  )}
                  <div 
                    className="mt-2 p-4 rounded-lg border-2 transition-all"
                    style={{ 
                      backgroundColor: primaryColor,
                      borderColor: primaryColor 
                    }}
                  >
                    <p className="text-white text-sm font-medium">Aperçu couleur principale</p>
                    <p className="text-white/80 text-xs mt-1">{primaryColor}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Couleur Secondaire</Label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Input
                        id="secondaryColor"
                        type="color"
                        {...register("secondaryColor")}
                        className="w-16 h-12 cursor-pointer border-2 rounded-lg"
                        style={{ 
                          backgroundColor: secondaryColor,
                          borderColor: secondaryColor 
                        }}
                      />
                    </div>
                    <Input
                      {...register("secondaryColor")}
                      placeholder="#059669"
                      className="flex-1"
                    />
                  </div>
                  {errors.secondaryColor && (
                    <p className="text-sm text-red-600">{errors.secondaryColor.message}</p>
                  )}
                  <div 
                    className="mt-2 p-4 rounded-lg border-2 transition-all"
                    style={{ 
                      backgroundColor: secondaryColor,
                      borderColor: secondaryColor 
                    }}
                  >
                    <p className="text-white text-sm font-medium">Aperçu couleur secondaire</p>
                    <p className="text-white/80 text-xs mt-1">{secondaryColor}</p>
                  </div>
                </div>
              </div>

              {/* Aperçu complet */}
              <div className="p-6 rounded-lg border-2 border-dashed bg-gray-50 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold mb-1">Aperçu de l'interface</p>
                    <p className="text-xs text-gray-600">Les changements sont visibles en temps réel</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {showPreview ? "Masquer" : "Afficher"} l'aperçu
                  </Button>
                </div>

                {showPreview && (
                  <div className="space-y-4 pt-4 border-t">
                    {/* Aperçu header */}
                    <div 
                      className="p-6 rounded-lg text-white"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
                      }}
                    >
                      <h3 className="text-2xl font-bold mb-2">{name || "Nom de la plateforme"}</h3>
                      <p className="text-white/90">Aperçu de votre plateforme avec les nouvelles couleurs</p>
                    </div>

                    {/* Aperçu boutons */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Boutons</p>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          type="button"
                          style={{
                            background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                          }}
                        >
                          Bouton Principal
                        </Button>
                        <Button 
                          variant="outline" 
                          type="button"
                          style={{
                            borderColor: primaryColor,
                            color: primaryColor
                          }}
                        >
                          Bouton Secondaire
                        </Button>
                        <Button 
                          variant="ghost" 
                          type="button"
                          style={{
                            color: primaryColor
                          }}
                        >
                          Bouton Ghost
                        </Button>
                      </div>
                    </div>

                    {/* Aperçu badges */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Badges</p>
                      <div className="flex flex-wrap gap-2">
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-medium text-white"
                          style={{ backgroundColor: primaryColor }}
                        >
                          Badge Primaire
                        </span>
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-medium text-white"
                          style={{ backgroundColor: secondaryColor }}
                        >
                          Badge Secondaire
                        </span>
                      </div>
                    </div>

                    {/* Aperçu cards */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Cartes</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-lg border-2" style={{ borderColor: primaryColor }}>
                          <div 
                            className="h-2 w-full rounded mb-3"
                            style={{ backgroundColor: primaryColor }}
                          />
                          <p className="text-sm font-medium">Carte exemple</p>
                          <p className="text-xs text-gray-600 mt-1">Aperçu de style</p>
                        </div>
                        <div className="p-4 rounded-lg border-2" style={{ borderColor: secondaryColor }}>
                          <div 
                            className="h-2 w-full rounded mb-3"
                            style={{ backgroundColor: secondaryColor }}
                          />
                          <p className="text-sm font-medium">Carte exemple</p>
                          <p className="text-xs text-gray-600 mt-1">Aperçu de style</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Aperçu simple (toujours visible) */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    type="button"
                    size="sm"
                    style={{
                      background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                    }}
                  >
                    Bouton Principal
                  </Button>
                  <Button 
                    variant="outline" 
                    type="button"
                    size="sm"
                    style={{
                      borderColor: primaryColor,
                      color: primaryColor
                    }}
                  >
                    Bouton Secondaire
                  </Button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="text-sm font-medium text-green-800 mb-1">
                    ✓ Paramètres mis à jour avec succès !
                  </p>
                  <p className="text-xs text-green-700">
                    Les couleurs sont mises à jour en temps réel. Note: Les modifications sont temporaires (mode démo).
                  </p>
                </div>
              )}

              <Button type="submit" disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer les modifications"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="content">
        <Card>
          <CardHeader>
            <CardTitle>Contenu Public</CardTitle>
            <CardDescription>
              Gérez les textes affichés sur votre plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aboutText">Texte "À propos"</Label>
                <Textarea
                  id="aboutText"
                  {...register("aboutText")}
                  placeholder="Décrivez votre plateforme..."
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="legalMentions">Mentions Légales</Label>
                <Textarea
                  id="legalMentions"
                  {...register("legalMentions")}
                  placeholder="Mentions légales..."
                  rows={6}
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contact">
        <Card>
          <CardHeader>
            <CardTitle>Informations de Contact</CardTitle>
            <CardDescription>
              Coordonnées affichées sur votre plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email de Contact</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...register("contactEmail")}
                  placeholder="contact@example.com"
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

              <Button type="submit" disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
