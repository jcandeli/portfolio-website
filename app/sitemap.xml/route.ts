import { NextResponse } from "next/server";
import allMedia from "@/data/media.json";
import { createMediaDetailsUrl } from "@/utils/url";

export async function GET() {
  const baseUrl = "https://jpcandelier.com";

  const staticRoutes = [""];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
  }));

  const dynamicPages = allMedia.map((item) => ({
    url: `${baseUrl}${createMediaDetailsUrl(item.type, item.title, item.id)}`,
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
