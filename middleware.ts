export const config = {
  matcher: ["/((?!_vercel|[^?]*\\.(?:html|json|css|js|ico|jpg|jpeg|png|gif|svg|ttf|woff|woff2|txt|xml|webp|avif)).*))"],
}

export default function middleware(request: Request): Response | undefined {
  const cookieHeader = request.headers.get("cookie") || ""
  const hasAnonId = cookieHeader.split(";").some((c) => c.trim().startsWith("its_anon_id="))
  if (hasAnonId) return undefined
  const anonId = crypto.randomUUID()
  const headers = new Headers({ "Location": request.url })
  headers.append("Set-Cookie", `its_anon_id=${anonId}; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax`)
  return new Response(null, { status: 302, headers })
}
