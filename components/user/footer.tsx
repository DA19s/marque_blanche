"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { mockTenants } from "@/lib/mock-data"

export function UserFooter() {
  const { data: session } = useSession()
  const tenantId = session?.user?.tenantId
  const tenant = tenantId ? mockTenants.find((t) => t.id === tenantId) : null

  return (
    <footer className="border-t bg-white">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div 
                className="h-8 w-8 rounded-lg"
                style={{ backgroundColor: "var(--tenant-primary)" }}
              />
              <span className="text-lg font-bold" style={{ color: "var(--tenant-primary)" }}>
                {tenant?.name || "FinEd"}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {tenant?.aboutText || "Plateforme de formation en ligne"}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-gray-600 hover:text-gray-900">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Mon Tableau de bord
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/support" className="text-gray-600 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {tenant?.contactEmail && (
                <li>{tenant.contactEmail}</li>
              )}
              {tenant?.contactPhone && (
                <li>{tenant.contactPhone}</li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {tenant?.legalMentions || "© 2024 Tous droits réservés"}
          </p>
          <p className="text-sm text-gray-500">
            Powered by <span className="font-semibold">FinEd</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
