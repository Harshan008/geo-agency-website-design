import type { MetadataRoute } from "next"
import { services, results, insights, site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: {
    path: string
    priority: number
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/audit", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/methodology", priority: 0.8, changeFrequency: "monthly" },
    { path: "/results", priority: 0.7, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/glossary", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ]

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.domain}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: `${site.domain}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...results.map((study) => ({
      url: `${site.domain}/results/${study.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...insights.map((insight) => ({
      url: `${site.domain}/insights/${insight.slug}`,
      lastModified: new Date(insight.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
