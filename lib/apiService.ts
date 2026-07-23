const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://breeter.phitanydev.in/api/'

export type ApiResponse<T> = {
  data: T | null
  error: string | null
  status: number
}

function buildUrl(path: string) {
  return path.startsWith('http') ? path : `${API_BASE}${path.replace(/^\//, '')}`
}

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(buildUrl(path), {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
    })

    const isJson = res.headers.get('content-type')?.includes('application/json')
    const body = isJson ? await res.json().catch(() => null) : await res.text()

    if (!res.ok) {
      const message =
        (isJson && body && typeof body === 'object' && 'message' in body && String((body as { message: unknown }).message)) ||
        res.statusText
      return { data: null, error: message, status: res.status }
    }

    return { data: body as T, error: null, status: res.status }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Network error', status: 0 }
  }
}

export function apiGet<T>(path: string, options?: RequestInit) {
  return request<T>(path, { ...options, method: 'GET' })
}

export function apiPost<T>(path: string, body?: unknown, options?: RequestInit) {
  return request<T>(path, { ...options, method: 'POST', body: body !== undefined ? JSON.stringify(body) : undefined })
}

export function apiPut<T>(path: string, body?: unknown, options?: RequestInit) {
  return request<T>(path, { ...options, method: 'PUT', body: body !== undefined ? JSON.stringify(body) : undefined })
}

export function apiPatch<T>(path: string, body?: unknown, options?: RequestInit) {
  return request<T>(path, { ...options, method: 'PATCH', body: body !== undefined ? JSON.stringify(body) : undefined })
}

export function apiDelete<T>(path: string, options?: RequestInit) {
  return request<T>(path, { ...options, method: 'DELETE' })
}
