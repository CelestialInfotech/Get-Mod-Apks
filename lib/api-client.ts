import type { ApkListResponse, Apk, Genre } from "./api-types"

const USE_PROXY = true
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`API error ${res.status}`)
  }

  return res.json()
}


export const apkApi = {
  getApks: (page = 1, limit = 20) =>
    apiFetch<ApkListResponse>(`/api/v0/getapks.php?page=${page}&limit=${limit}`),

  getApkDetail: (id: string) =>
    apiFetch<{ status: string; data: Apk }>(`/api/apkdetail?id=${id}`),

  getCategories: (genre: string) =>
    apiFetch<ApkListResponse>(
      `/api/v0/categories.php?genre=${encodeURIComponent(genre)}`
    ),

  getFilter: (filter: string, page = 1, limit = 20) =>
    apiFetch<ApkListResponse>(
      `/api/filter?type=${encodeURIComponent(filter)}&page=${page}&limit=${limit}`
    ),

  getGenres: () =>
    apiFetch<{ status: string; data: Genre[] }>(`/api/v0/genres.php`),

  getLatest: () =>
    apiFetch<{ status: string; data: Apk[] }>(`/api/letest`),
  getHome: () =>
    apiFetch<{ status: string; data: Apk[] }>(`/api/home`),
  getBanner: () =>
    apiFetch<{ status: string; data: Apk[] }>(`/api/banner`),

  searchApks: (query: string, page = 1, limit = 10) =>
    apiFetch<ApkListResponse>(
      `/api/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    ),

  getSimilar: (id: string) =>
    apiFetch(`/api/similar?id=${id}`),
}
