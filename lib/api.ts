// <CHANGE> Creating individual function exports from apkApi object to fix import error in hooks
import { apkApi } from "./api-client"

// Re-export API functions as individual named exports for use in hooks
export const getApks = apkApi.getApks
export const getApkDetail = apkApi.getApkDetail
export const getApksByCategory = apkApi.getCategories
export const getLatestApks = apkApi.getLatest
export const getHome = apkApi.getHome
export const getBanner = apkApi.getBanner
export const searchApks = apkApi.searchApks
export const getSimilarApks = apkApi.getSimilar
export const getGenres = apkApi.getGenres
export const getFilter = apkApi.getFilter

// Also re-export the apkApi object for direct access if needed
export { apkApi }
