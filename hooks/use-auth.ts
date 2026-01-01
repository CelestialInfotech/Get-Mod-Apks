"use client"

import { useState, useEffect } from "react"
import { getFirebaseAuth, initAnalytics } from "@/lib/firebase"
import {
  onAuthStateChanged,
  type User,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { logEvent } from "firebase/analytics"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const auth = getFirebaseAuth()
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setUser(user)
        setLoading(false)

        if (user) {
          const analytics = await initAnalytics()
          if (analytics) {
            logEvent(analytics, "login", { method: "Email" })
          }
        }
      })

      return () => unsubscribe()
    } catch (error) {
      console.error("[v0] Auth initialization error:", error)
      setLoading(false)
    }
  }, [])

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const auth = getFirebaseAuth()
      const result = await signInWithPopup(auth, provider)
      const analytics = await initAnalytics()
      if (analytics) {
        logEvent(analytics, "login", { method: "Google" })
      }
      return result.user
    } catch (error: any) {
      throw error
    }
  }

  const signupWithEmail = async (email: string, password: string, displayName?: string) => {
    try {
      const auth = getFirebaseAuth()
      const result = await createUserWithEmailAndPassword(auth, email, password)

      if (displayName && result.user) {
        await updateProfile(result.user, { displayName })
      }

      const analytics = await initAnalytics()
      if (analytics) {
        logEvent(analytics, "sign_up", { method: "Email" })
      }

      return result.user
    } catch (error: any) {
      throw error
    }
  }

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const auth = getFirebaseAuth()
      const result = await signInWithEmailAndPassword(auth, email, password)

      const analytics = await initAnalytics()
      if (analytics) {
        logEvent(analytics, "login", { method: "Email" })
      }

      return result.user
    } catch (error: any) {
      throw error
    }
  }

  const logout = async () => {
    try {
      const analytics = await initAnalytics()
      if (analytics) {
        logEvent(analytics, "logout")
      }
      const auth = getFirebaseAuth()
      await signOut(auth)
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return {
    user,
    loading,
    loginWithGoogle,
    signupWithEmail,
    loginWithEmail,
    logout,
  }
}
