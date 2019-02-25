const connect = require("connect-mongo")
const mongoose = require("mongoose")

mongoose.connect(
  process.env.NODE_ENV === "production"
    ? `mongodb+srv://lyric-test:${
        process.env.MONGO_ATLAS_PASSWORD
      }@cluster0-qhv6z.mongodb.net/lyric-test-session?retryWrites=true`
    : "mongodb://localhost:27017/test",
  { useNewUrlParser: true }
)

const store = session => {
  const MongoStore = connect(session)
  return new MongoStore({
    mongooseConnection: mongoose.connection
  })
}

module.exports = store
