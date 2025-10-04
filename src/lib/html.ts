import type { StateFile } from "./types";

export function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
}

/** Build simple HTML for client-render fallback when server didn’t render slides. */
export function buildClientSlideHTML(
  slide: any,
  lang: string,
  projectId: string,
  base: string
) {
  const dir = (lang || "ar").startsWith("ar") ? "rtl" : "ltr";
  const title = escapeHtml(slide.title || "");
  const subtitle = escapeHtml(slide.subtitle || "");
  const bullets = Array.isArray(slide.bullets) ? slide.bullets : [];
  const imgSrc = slide.image ? `${base}/artifacts/${projectId}/${slide.image}` : "";

  return `<!DOCTYPE html>
<html lang="${dir === "rtl" ? "ar" : "en"}" dir="${dir}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title || "Slide"}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap">
<style>
  body{font-family:Tajawal,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;margin:0;background:#0b0d12;color:#e6e8ee}
  .wrap{padding:28px;max-width:1000px;margin:0 auto}
  h1{margin:0 0 8px 0;font-size:32px}
  h2{margin:0 0 12px 0;font-size:18px;opacity:.8}
  ul{margin:12px 0 0 22px;padding:0}
  li{margin:8px 0}
  .img{margin-top:18px}
  .img img{max-width:100%;height:auto;display:block;border:1px solid #22252e;border-radius:12px}
  html, body { overflow:hidden }
</style>
</head>
<body>
  <div class="wrap">
    <h1>${title || "Slide"}</h1>
    ${subtitle ? `<h2>${subtitle}</h2>` : ""}
    ${bullets.length ? `<ul>${bullets.map((b: any) => `<li>${escapeHtml(String(b))}</li>`).join("")}</ul>` : ""}
    ${imgSrc ? `<div class="img"><img src="${imgSrc}" alt=""></div>` : ""}
  </div>
</body>
</html>`;
}
