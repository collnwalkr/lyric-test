require("dotenv").config()
const express = require("express")
const spotify = require("./src/spotify")
const middleware = require("./src/middleware")
const store = require("./src/store")
const passport = require("./src/passport")

const app = express()
const PORT = 3030

app.use(...middleware)

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user.displayName)
  } else {
    res.send(`You got home page!`)
  }
})

app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({
      displayName: req.user.displayName,
      photo: req.user.photos[0]
    })
  } else {
    res.status(401).send("need to login")
  }
})

app.get("/isAuthenticated", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(true)
  } else {
    res.status(401).send(false)
  }
})

app.get("/recent", checkAccess, (req, res) => {
  spotify
    .recentlyPlayed(req.user)
    .then(response => {
      const {
        data: { items }
      } = response
      const responseItems = items.map(({ track }) => {
        if (track.album) {
          return {
            album_image: track.album.images[0],
            title: track.name,
            artist: track.artists[0].name,
            link: track.external_urls.spotify
          }
        }
      })
      res.send(responseItems)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

app.get("/login", (req, res) => {
  res.redirect("/auth/spotify")
})

app.get("/logout", (req, res) => {
  req.logout()
  res.redirect("http://localhost:3000/")
})

app.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-recently-played"]
  }),
  (req, res) => {}
)

app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000/")
  }
)

async function checkAccess(req, res, next) {
  if (req.isAuthenticated()) {
    // if the session is about to expire, go ahead and
    // refresh the token
    if (Date.now() - 60 * 1000 > req.user.expires) {
      console.log("expired")
      req.user = await spotify.refreshSpotifyToken(req.user)
    }
    return next()
  } else {
    res.redirect("/")
  }
}

app.listen(PORT, () => {
  console.log(`🗣 listening on ${PORT}`)
})
