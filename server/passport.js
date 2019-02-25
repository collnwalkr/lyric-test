const passport = require("passport")
const SpotifyStrategy = require("passport-spotify").Strategy

const callbackURL =
  process.env.NODE_ENV === "production"
    ? "http://my-app.com/auth/spotify/callback"
    : "http://localhost:3030/auth/spotify/callback"

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      done(null, {
        ...profile,
        accessToken,
        refreshToken,
        expires: Date.now() + expires_in * 1000
      })
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

module.exports = passport
