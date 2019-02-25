const session = require("express-session")
const bodyParser = require("body-parser")
const uuid = require("uuid/v4")
const store = require("./store")
const passport = require("./passport")
const cors = require("cors")

const corsConfig = {
  credentials: true,
  origin:
    process.env.NODE_ENV === "production"
      ? "http://my-app.com"
      : "http://localhost:3000"
}

const middleware = [
  cors(corsConfig),
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
  session({
    genid: () => uuid(),
    store: store(session),
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    cookie: { domain: "localhost" },
    saveUninitialized: false
  }),
  passport.initialize(),
  passport.session()
]

module.exports = middleware
