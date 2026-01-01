export interface Apk {
  id: string
  title: string
  url: string
  logo: string
  version: string
  size: string
  category: string
  publisher: string
  genre: string
  latest_version: string
  mod_info: string
  get_it_on: string
  description: string
  rating?: number
  downloads?: string
  developer?: string
  screenshots?: string[]
  modFeatures?: string[]
  downloadUrl?: string
}

export interface ApkListResponse {
  status: string
  data: Apk[]
  pagination: {
    current_page: number
    total_pages: number
    total_items: number
    limit: number
  }
}

export interface Genre {
  id: string
  name: string
}
