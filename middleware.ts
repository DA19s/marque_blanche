import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Routes publiques exactes (doivent correspondre exactement)
  const exactPublicRoutes = [
    "/login",
    "/admin-login",
    "/super-admin/login",
    "/register",
    "/about",
    "/contact",
    "/support",
  ]
  
  // Routes publiques avec préfixe (peuvent avoir des sous-routes)
  const prefixPublicRoutes = [
    "/api/auth",
  ]
  
  // Routes de login par tenant (ex: /ciaivert/login, /microfinance/login)
  const tenantLoginPattern = /^\/[^\/]+\/login$/
  
  // Routes publiques qui peuvent être accessibles avec ou sans authentification
  const publicOrAuthRoutes = [
    "/",
    "/catalogue",
  ]
  
  // Vérifier d'abord les routes publiques exactes
  if (exactPublicRoutes.includes(pathname)) {
    return NextResponse.next()
  }
  
  // Vérifier les routes de login par tenant
  if (tenantLoginPattern.test(pathname)) {
    return NextResponse.next()
  }
  
  // Vérifier les routes publiques avec préfixe
  if (prefixPublicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }
  
  // Vérifier les routes publiques ou authentifiées
  if (publicOrAuthRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Redirection si non authentifié pour les autres routes
  if (!session || !session.user) {
    // Rediriger vers la bonne page de login selon la route
    if (pathname.startsWith("/super-admin") && pathname !== "/super-admin/login") {
      return NextResponse.redirect(new URL("/super-admin/login", req.url))
    } else if (pathname.startsWith("/admin") && pathname !== "/admin-login") {
      return NextResponse.redirect(new URL("/admin-login", req.url))
    } else if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url))
    } else if (pathname.startsWith("/module")) {
      // Les routes /module peuvent être publiques (catalogue) ou privées (leçons)
      // On laisse passer pour que la page décide
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  // Protection routes Super Admin (seulement si authentifié)
  if (pathname.startsWith("/super-admin") && pathname !== "/super-admin/login") {
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/super-admin/login", req.url))
    }
  }

  // Protection routes Admin Partenaire (seulement si authentifié)
  if (pathname.startsWith("/admin") && pathname !== "/admin-login") {
    if (session.user.role !== "ADMIN_PARTNER" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/admin-login", req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
