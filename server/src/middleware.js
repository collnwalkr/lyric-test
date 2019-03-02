const session = require("express-session")
const bodyParser = require("body-parser")
const cors = require("cors")
const uuid = require("uuid/v4")
const store = require("./store")
const passport = require("./passport")

const corsConfig =
  process.env.NODE_ENV === "production"
    ? {
        credentials: true
      }
    : {
        credentials: true,
        origin: "http://localhost:3000"
      }

const cookie =
  process.env.NODE_ENV === "production"
    ? {}
    : {
        domain: "localhost"
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
    cookie,
    saveUninitialized: false
  }),
  passport.initialize(),
  passport.session()
]

module.exports = middleware
