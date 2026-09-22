export type SiteSettings = {
  contact_phone: string | null
  contact_whatsapp: string | null
  contact_email: string | null
  contact_address: string | null
  social_facebook: string | null
  social_instagram: string | null
  social_youtube: string | null
  social_twitter: string | null
  social_linkedin: string | null
  default_from_location: string | null
  default_from_latitude: number | null
  default_from_longitude: number | null
  default_to_location: string | null
  default_to_latitude: number | null
  default_to_longitude: number | null
  marquee_text: string | null
}

export type SiteSettingsData = {
  data: SiteSettings
}
