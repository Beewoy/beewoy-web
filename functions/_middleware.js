/**
 * Host canonicalization for Cloudflare Pages.
 * Apex HTTPS only: https://beewoy.sk
 *
 * Note: Domain redirects via _redirects are NOT supported by Cloudflare Pages.
 * Prefer zone-level Bulk Redirect / Redirect Rule (see README).
 * This middleware is a belt-and-suspenders fallback when Pages Functions run.
 */
const APEX_HOST = "beewoy.sk";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  const needsHostFix = host === `www.${APEX_HOST}`;
  const needsHttps = url.protocol === "http:";

  if (needsHostFix || needsHttps) {
    url.protocol = "https:";
    url.hostname = APEX_HOST;
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
