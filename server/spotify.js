const qs = require("querystring")
const axios = require("axios")

const recentlyPlayed = user =>
  axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })

const refreshSpotifyToken = user =>
  axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "refresh_token",
        refresh_token: user.refreshToken
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${new Buffer(
            `${process.env.SPOTIFY_CLIENT_ID}:${
              process.env.SPOTIFY_CLIENT_SECRET
            }`
          ).toString("base64")}`
        }
      }
    )
    .then(({ data }) => {
      user.refreshToken = data.refresh_token || user.refreshToken
      user.accessToken = data.access_token
      user.expires = Date.now() + data.expires_in
      return user
    })
    .catch(error => {
      console.log("error refreshing token", error)
      return user
    })

module.exports = {
  refreshSpotifyToken,
  recentlyPlayed
}
