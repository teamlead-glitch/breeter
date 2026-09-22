import { apiGet } from '@/lib/apiService'
import { SiteSettingsData } from '@/types/settings'

export function fetchSiteSettings() {
  return apiGet<SiteSettingsData>('v1/settings')
}
