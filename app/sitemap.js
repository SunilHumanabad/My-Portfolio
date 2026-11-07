import { site } from '@/config/site';

export const dynamic = 'force-static';

export default function sitemap() {
  return [{ url: `${site.websiteUrl}/`, changeFrequency: 'monthly', priority: 1 }];
}
