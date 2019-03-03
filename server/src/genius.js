const axios = require("axios")
const Lyricist = require("lyricist")
const accessToken = process.env.GENIUS_TOKEN

const lyricist = new Lyricist(accessToken)

const a = axios.create({
  baseURL: "https://api.genius.com/",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json"
  }
})

const getLyrics = async (artist, song) => {
  try {
    const {
      data: {
        response: { hits }
      }
    } = await a.get(`search?q=${artist} ${song}`)
    const topSong = hits.find(hit => hit.type === "song")
    if (topSong) {
      const {
        result: { id, url }
      } = topSong
      const { lyrics } = await lyricist.song(id, { fetchLyrics: true })
      const parsedLyrics = lyrics
        .split("\n")
        .filter(line => !/\[[\w\W]+?\]/.test(line) && line !== "")
      return {
        lyrics: parsedLyrics,
        url
      }
    } else {
      return {
        lyrics: null,
        url: null
      }
    }
  } catch (error) {
    return {
      lyrics: null,
      url: null
    }
  }
}

module.exports = {
  getLyrics
}
