"use client"

import { useState, useEffect } from "react"
import {
  getApks,
  getApkDetail,
  getApksByCategory,
  getLatestApks,
  searchApks,
  getSimilarApks,
  getGenres,
  getFilter,
  getHome,
  getBanner,
} from "@/lib/api"
import type { Apk, ApkListResponse } from "@/lib/api-types"
import { get } from "http"

// Hook for fetching paginated APK list
export function useApkList(page = 1, limit = 20) {
  const [data, setData] = useState<ApkListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getApks(page, limit)
        setData(response)
      } catch (err) {
        setError(err as Error)
        console.error("[v0] Error fetching APK list:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page, limit])

  return { data, loading, error, apks: data?.data || [] }
}

// Hook for fetching single APK details
export function useApkDetail(id: string) {
  const [data, setData] = useState<Apk | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getApkDetail(id)
        setData(response.data)
      } catch (err) {
        setError(err as Error)
        console.error("[v0] Error fetching APK detail:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  return { data, loading, error }
}

// Hook for fetching APKs by category
export function useApksByCategory(genre: string) {
  const [data, setData] = useState<ApkListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!genre) return

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getApksByCategory(genre)
        setData(response)
      } catch (err) {
        setError(err as Error)
        console.error("[v0] Error fetching APKs by category:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [genre])

  return { data, loading, error, apks: data?.data || [] }
}
// Hook for fetching APKs by category
export function useApksByFilter(
  filter: string,
  page: number,
  limit: number
) {
  const [data, setData] = useState<ApkListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!filter) return

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await getFilter(filter, page, limit)
        setData(response)
      } catch (err) {
        setError(err as Error)
        console.error("[v0] Error fetching APKs by category:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filter, page, limit]) // ✅ FIX HERE

  return {
    data,
    loading,
    error,
    apks: data?.data || [],
  }
}

// Hook for fetching latest APKs
export function useLatestApks() {
  const [data, setData] = useState<{ status: string; data: Apk[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getLatestApks()
        console.log("[v0] Latest APKs response:", response)
        setData(response)
      } catch (err) {
        setError(err as Error)
        console.error("[v0] Error fetching latest APKs:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error, apks: data?.data || [] }
}
export function useBannerApks() {
  const [data, setData] = useState<{ status: string; data: Apk[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getBanner()
        console.log("[v0] Latest APKs response:", response)
        setData(response)
      } catch (err) {
        setError(err as Error)
        console.error("[v0] Error fetching latest APKs:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error, apks: data?.data || [] }
}
export function useHomeApks() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getHome()
        setData(res.data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const latest = data?.latest || []
  const trending = data?.trending || []
  const popular = data?.popular || []

  return {
    loading,
    error,

    // flat (optional)
    latest,
    trending,
    popular,

    // ✅ GROUPED DATA (THIS IS WHAT YOU WANT)
    games: {
      latest: byCategory(latest, "Games"),
      trending: byCategory(trending, "Games"),
      popular: byCategory(popular, "Games"),
    },

    apps: {
      latest: byCategory(latest, "Apps"),
      trending: byCategory(trending, "Apps"),
      popular: byCategory(popular, "Apps"),
    },
  }
}

const byCategory = (list: any[], category: string) =>
  list.filter((item) => item.category === category)

// Hook for searching APKs
export function useSearchApks(query: string, page = 1, limit = 10) {
  const [data, setData] = useState<ApkListResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!query || query.length < 3) {
      setData(null)
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await searchApks(query, page, limit)
        setData(response)
      } catch (err) {
        setError(err as Error)
        console.error("[v0] Error searching APKs:", err)
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const timeoutId = setTimeout(fetchData, 300)
    return () => clearTimeout(timeoutId)
  }, [query, page, limit])

  return { data, loading, error, results: data?.data || [] }
}

// Hook for fetching similar APKs
export function useSimilarApks(id: string) {
  const [data, setData] = useState<ApkListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getSimilarApks(id)
        setData(response)
      } catch (err) {
        setError(err as Error)
        console.error("[v0] Error fetching similar APKs:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  return { data, loading, error, apks: data?.data || [] }
}

// Hook for fetching genres
export function useGenres() {
  const [data, setData] = useState<{ status: string; data: { id: string; name: string }[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getGenres()
        setData(response)
      } catch (err) {
        setError(err as Error)
        console.error("[v0] Error fetching genres:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error, genres: data?.data || [] }
}
