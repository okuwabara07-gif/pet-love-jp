import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pet-love-jp.vercel.app'
  
  const tryDirs = [
    path.join(process.cwd(), 'content/blog'),
    path.join(process.cwd(), 'content/posts'),
    path.join(process.cwd(), 'content/articles'),
  ]
  
  let slugs: string[] = []
  for (const dir of tryDirs) {
    try {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter((f: string) => /\.(mdx?|md)$/.test(f))
        if (files.length > 0) {
          slugs = files.map((f: string) => f.replace(/\.(mdx?|md)$/, ''))
          break
        }
      }
    } catch {}
  }

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    ...slugs.map((slug: string) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
