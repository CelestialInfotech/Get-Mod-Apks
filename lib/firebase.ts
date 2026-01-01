import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getAnalytics, isSupported } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyASFnRfhOPDr8mRin3Ihv6UhlUsbjMIthA",
  authDomain: "mod-apk-free-0.firebaseapp.com",
  projectId: "mod-apk-free-0",
  storageBucket: "mod-apk-free-0.firebasestorage.app",
  messagingSenderId: "62451999180",
  appId: "1:62451999180:web:b58bba5685ebafbad63d69",
  measurementId: "G-D0LLRYS8J6",
}

// Initialize Firebase app safely with singleton pattern
let app: FirebaseApp
let authInstance: Auth | null = null

export function getFirebaseApp() {
  if (!app) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
  }
  return app
}

// Use a module-level variable to cache the Auth instance
export function getFirebaseAuth() {
  if (typeof window === "undefined") {
    throw new Error("Auth can only be used on client side")
  }

  const currentApp = getFirebaseApp()

  if (!authInstance) {
    // Explicitly using the app instance to avoid "Component auth has not been registered" errors
    authInstance = getAuth(currentApp)
  }

  return authInstance
}

// Initialize Analytics conditionally (only in browser)
export const initAnalytics = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    const app = getFirebaseApp()
    return getAnalytics(app)
  }
  return null
}

// Export functions instead of direct instances
export { getFirebaseApp as app }
