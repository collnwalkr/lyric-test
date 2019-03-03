import axios from "axios"

const removeBadChars = string => string.replace(/\//g, "")

const baseURL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3030/api"

const a = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": baseURL
  }
})

const getUser = () => a.get("user")

const isAuthenticated = () => a.get("isAuthenticated")

const getRecent = () => a.get("recent")

const getLyrics = (artist, title) =>
  a.get(`lyrics/${removeBadChars(artist)}/${removeBadChars(title)}`)

export { getUser, isAuthenticated, getRecent, getLyrics }
