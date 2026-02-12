import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          Page non trouvée
        </h2>
        <p className="mt-2 text-gray-600">
          La page que vous recherchez n'existe pas.
        </p>
        <div className="mt-8">
          <Link href="/super-admin">
            <Button>Retour au Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
