import axios from "axios"

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://my-app.com"
    : "http://localhost:3030"

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

export { getUser, isAuthenticated, getRecent }
