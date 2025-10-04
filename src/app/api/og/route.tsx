import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type") ?? "slides";
  const locale = url.searchParams.get("locale") ?? "en";

  // Prefer a provided title; otherwise show a sensible default per type/locale
  const rawTitle =
    url.searchParams.get("title") ??
    (locale === "ar"
      ? type === "video" ? "صفحة فيديو" : "صفحة شرائح"
      : type === "video" ? "Video Page" : "Slides Page");

  let title = rawTitle;
  try {
    title = decodeURIComponent(rawTitle);
  } catch {
    // ignore bad encoding; use raw title
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0f1115",
          color: "white",
          padding: "64px",
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.7, marginBottom: 12 }}>
          {locale === "ar"
            ? type === "video"
              ? "صفحة فيديو"
              : "صفحة شرائح"
            : type === "video"
              ? "Video Page"
              : "Slides Page"}
        </div>
        <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1, whiteSpace: "pre-wrap" }}>
          {title}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
