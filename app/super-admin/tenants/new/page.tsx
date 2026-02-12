import { CreateTenantForm } from "@/components/super-admin/create-tenant-form"

export default function NewTenantPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Créer un Nouveau Tenant</h1>
        <p className="text-gray-600 mt-2">
          Ajoutez un nouveau partenaire à la plateforme
        </p>
      </div>
      <CreateTenantForm />
    </div>
  )
}
