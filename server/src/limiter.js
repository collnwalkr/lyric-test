const slowDown = require("express-slow-down")

const limiter = slowDown({
  windowMs: 60 * 1000, // reset every 1 minute
  delayAfter: 20, // allow 20 requests per 1 minute
  delayMs: 500, // begin adding 500ms of delay per request above 20
  maxDelayMs: 1500 // max out at 1.5s delay
})

module.exports = limiter
