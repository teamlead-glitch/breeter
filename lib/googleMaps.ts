let loadPromise: Promise<void> | null = null

const SCRIPT_ID = 'google-maps-script'
const CALLBACK_NAME = '__breeterGoogleMapsReady'

declare global {
  interface Window {
    [CALLBACK_NAME]?: () => void
  }
}

export function loadGoogleMapsPlaces(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('window is not available'))
  if (window.google?.maps?.places) return Promise.resolve()
  if (loadPromise) return loadPromise

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  if (!apiKey) return Promise.reject(new Error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set'))

  loadPromise = new Promise((resolve, reject) => {
    // `loading=async` means the script tag's own `load` event can fire before the `google.maps`
    // namespace is actually ready — Google's documented fix is its `callback` param instead, which
    // only fires once the library is fully initialized.
    const prevCallback = window[CALLBACK_NAME]
    window[CALLBACK_NAME] = () => {
      prevCallback?.()
      resolve()
    }

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
    if (existing) {
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps script')))
      return
    }

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async&callback=${CALLBACK_NAME}`
    script.async = true
    script.onerror = () => {
      loadPromise = null
      reject(new Error('Failed to load Google Maps script'))
    }
    document.head.appendChild(script)
  })

  return loadPromise
}
