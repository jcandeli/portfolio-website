import { NextResponse } from "next/server";
import allMedia from "@/data/media.json";

export async function GET() {
  const baseUrl = "https://jpcandelier.com";

  const staticRoutes = [""];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
  }));

  const dynamicPages = allMedia.map((item) => ({
    url: `${baseUrl}/details/${item.type}/${item.title
      .toLowerCase()
      .replace(/\s+/g, "-")}--${item.id}`,
  }));

  const sitemap = [...staticPages, ...dynamicPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemap
        .map(
          (page) => `
        <url>
          <loc>${page.url}</loc>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
