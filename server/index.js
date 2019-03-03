require("now-env")
const express = require("express")
const spotify = require("./src/spotify")
const genius = require("./src/genius")
const middleware = require("./src/middleware")
const store = require("./src/store")
const passport = require("./src/passport")
const limiter = require("./src/limiter")
const uniqBy = require("lodash/uniqBy")

const app = express()

app.use(...middleware)

app.get("/api/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user.displayName)
  } else {
    res.send(`You got home page!`)
  }
})

app.get("/api/lyrics/:artist/:song", limiter, checkAccess, (req, res) => {
  genius
    .getLyrics(req.params.artist, req.params.song)
    .then(response => {
      res.send(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({
      displayName: req.user.displayName,
      photo: req.user.photos[0]
    })
  } else {
    res.status(401).send("need to login")
  }
})

app.get("/api/isAuthenticated", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(true)
  } else {
    res.status(401).send(false)
  }
})

app.get("/api/recent", checkAccess, (req, res) => {
  spotify
    .recentlyPlayed(req.user)
    .then(response => {
      const {
        data: { items }
      } = response
      const responseItems = items.map(({ track }) => {
        if (track.album) {
          return {
            album_image: track.album.images[0].url,
            title: track.name,
            artist: track.artists[0].name,
            link: track.external_urls.spotify
          }
        }
      })
      res.send(uniqBy(responseItems, "link"))
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

app.get("/api/login", (req, res) => {
  res.redirect("/api/auth/spotify")
})

app.get("/api/logout", (req, res) => {
  req.logout()
  process.env.NODE_ENV === "production"
    ? res.redirect("/")
    : res.redirect("http://localhost:3000/")
})

app.get(
  "/api/auth/spotify",
  passport.authenticate("spotify", {
    showDialog: true,
    scope: ["user-read-recently-played"]
  }),
  (req, res) => {}
)

app.get(
  "/api/auth/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/" }),
  (req, res) => {
    process.env.NODE_ENV === "production"
      ? res.redirect("/")
      : res.redirect("http://localhost:3000/")
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

if (process.env.NODE_ENV === "production") {
  app.listen()
} else {
  app.listen(3030, () => {
    console.log(`🗣 listening on 3030`)
  })
}
