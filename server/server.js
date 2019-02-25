require("dotenv").config()
const express = require("express")
const spotify = require("./spotify")
const middleware = require("./middleware")
const store = require("./store")
const passport = require("./passport")

const app = express()
const PORT = 3030

app.use(...middleware)

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user.displayName)
  } else {
    res.send(`You got home page!\n`)
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
      res.send(response.data)
    })
    .catch(({ response: { data: { error } } }) => {
      res.status(500).send(error)
    })
})

app.get("/login", (req, res) => {
  res.redirect("/auth/spotify")
})

app.get("/logout", function(req, res) {
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
