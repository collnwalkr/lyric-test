import React, { createContext, Component } from "react"
import ls from "local-storage"
import sample from "lodash/sample"
import sampleSize from "lodash/sampleSize"
import random from "lodash/random"
import isEmpty from "lodash/isEmpty"
import { isAuthenticated, getUser } from "../api"
import { alreadyInLocalStorage } from "../utils"
import { getRecent, getLyrics } from "../api"
const { Provider: StateProvider, Consumer: StateConsumer } = createContext()

const MAX_LINE_LENGTH = 100

class State extends Component {
  setStatePromise = newState =>
    new Promise(resolve => {
      this.setState(newState, () => {
        resolve()
      })
    })

  updateStateAndLocal = (key, value) => {
    ls.set(key, value)
    return this.setStatePromise({ [key]: value })
  }

  state = {
    loggedIn: undefined,
    score: {
      count: 0,
      correct: 0
    },
    selectedSong: false,
    quote: [],
    correctSong: {},
    lyricsUrl: "",
    songOptions: [],
    availableSongs: [],
    nextQuote: [],
    nextSong: {},
    nextLyricsUrl: "",
    nextSongOptions: [],
    nextAvailableSongs: [],
    setQuote: quote => {
      return this.updateStateAndLocal("quote", quote)
    },
    setLyricsUrl: lyricsUrl => {
      return this.updateStateAndLocal("lyricsUrl", lyricsUrl)
    },
    setUser: user => {
      return this.updateStateAndLocal("user", user)
    },
    setSong: selectedSong => {
      return this.updateStateAndLocal("selectedSong", selectedSong)
    },
    setCorrectSong: correctSong => {
      return this.updateStateAndLocal("correctSong", correctSong)
    },
    setSongOptions: songOptions => {
      return this.updateStateAndLocal("songOptions", songOptions)
    },
    setAvailableSongs: availableSongs => {
      return this.updateStateAndLocal("availableSongs", availableSongs)
    },
    setNextSongOptions: nextSongOptions => {
      return this.updateStateAndLocal("nextSongOptions", nextSongOptions)
    },
    setNextSong: nextSong => {
      return this.updateStateAndLocal("nextSong", nextSong)
    },
    setNextLyricsUrl: nextLyricsUrl => {
      return this.updateStateAndLocal("nextLyricsUrl", nextLyricsUrl)
    },
    setNextQuote: nextQuote => {
      return this.updateStateAndLocal("nextQuote", nextQuote)
    },
    setNextAvailableSongs: nextAvailableSongs => {
      return this.updateStateAndLocal("nextAvailableSongs", nextAvailableSongs)
    },
    setScore: score => {
      return this.updateStateAndLocal("score", score)
    },
    logIn: () => {
      return this.setStatePromise({ loggedIn: true })
    },
    logOut: () => {
      return this.setStatePromise({ loggedIn: false })
    },
    adjustScore: increase => {
      const { count, correct } = this.state.score
      this.state.setScore({
        count: count + 1,
        correct: increase ? correct + 1 : correct
      })
    },
    resetScore: () => {
      this.state.setScore({
        count: 0,
        correct: 0
      })
    },
    goToNextSong: async () => {
      // if we already have the next question set up, use that
      const {
        nextSong,
        nextQuote,
        nextSongOptions,
        nextAvailableSongs,
        nextLyricsUrl
      } = this.nextQuestionReady()
        ? this.state
        : await this.getQuestion(this.state.correctSong)
      await this.resetNextQuestion()
      await this.state.setSongOptions(nextSongOptions)
      await this.state.setQuote(nextQuote)
      await this.state.setLyricsUrl(nextLyricsUrl)
      await this.state.setAvailableSongs(nextAvailableSongs)
      await this.state.setCorrectSong(nextSong)
      await this.state.setSong(false)
      this.getNextQuestion()
    },
    resetGame: async () => {
      const { data: availableSongs } = await getRecent()
      await this.state.setAvailableSongs(sampleSize(availableSongs, 10))
      const {
        nextSong,
        nextQuote,
        nextSongOptions,
        nextAvailableSongs,
        nextLyricsUrl
      } = await this.getQuestion({})
      await this.state.setSongOptions(nextSongOptions)
      await this.state.setQuote(nextQuote)
      await this.state.setLyricsUrl(nextLyricsUrl)
      await this.state.setCorrectSong(nextSong)
      await this.state.setAvailableSongs(nextAvailableSongs)
      await this.state.setSong(false)
      await this.resetScore()
      this.getNextQuestion()
    }
  }

  getNextQuestion = async () => {
    const { correctSong: currentCorrectSong } = this.state
    const {
      nextSong,
      nextQuote,
      nextSongOptions,
      nextAvailableSongs,
      nextLyricsUrl
    } = await this.getQuestion(currentCorrectSong)
    await this.state.setNextSongOptions(nextSongOptions)
    await this.state.setNextQuote(nextQuote)
    await this.state.setNextLyricsUrl(nextLyricsUrl)
    await this.state.setNextSong(nextSong)
    await this.state.setNextAvailableSongs(nextAvailableSongs)
  }

  resetNextQuestion = async () => {
    await this.state.setNextSongOptions([])
    await this.state.setNextQuote([])
    await this.state.setNextSong({})
    await this.state.setNextLyricsUrl("")
  }

  getSongQuote = async (artist, title) => {
    const {
      data: { lyrics, url }
    } = await getLyrics(artist, title)
    if (lyrics) {
      const firstLineIndex = random(0, lyrics.length - 2)
      const quote = [lyrics[firstLineIndex], lyrics[firstLineIndex + 1]]
      if (quote[0] && quote[0].length > MAX_LINE_LENGTH) {
        return {
          quote: [`${quote[0].substr(0, MAX_LINE_LENGTH)}...`],
          url
        }
      } else {
        return {
          quote,
          url
        }
      }
    } else {
      return {
        quote: null,
        url: null
      }
    }
  }

  nextQuestionReady = () => {
    const {
      nextSong,
      nextQuote,
      nextSongOptions,
      nextAvailableSongs,
      nextLyricsUrl
    } = this.state
    const a =
      !isEmpty(nextSong) &&
      !isEmpty(nextQuote) &&
      !isEmpty(nextSongOptions) &&
      !isEmpty(nextAvailableSongs) &&
      nextLyricsUrl !== ""
    return a
  }

  getQuestion = async (songToExclude = {}) => {
    const { availableSongs } = this.state
    let getRidOfSong = songToExclude
    let nextAvailableSongs = []
    let nextSongOptions = []
    let nextSong = {}
    let response = {}
    let nextQuote = false
    let nextLyricsUrl = ""
    while (!nextQuote) {
      nextAvailableSongs = availableSongs.filter(
        ({ title }) => title !== getRidOfSong.title
      )
      nextSongOptions = sampleSize(nextAvailableSongs, 4)
      nextSong = sample(nextSongOptions)
      response = await this.getSongQuote(nextSong.artist, nextSong.title)
      nextQuote = response.quote
      nextLyricsUrl = response.url
      // if no quote, set up this song to be ignored in
      // the next list of available songs
      getRidOfSong = nextSong
    }
    return {
      nextSong,
      nextQuote,
      nextSongOptions,
      nextAvailableSongs,
      nextLyricsUrl
    }
  }

  resetScore = () => {
    this.state.setScore({
      count: 0,
      correct: 0
    })
  }

  componentDidMount = async () => {
    this.setState(alreadyInLocalStorage())
    try {
      await isAuthenticated()
      if (!ls.get("user")) {
        const { data: user } = await getUser()
        this.setState({ user }, () => this.state.logIn())
      } else {
        this.state.logIn()
      }
    } catch (error) {
      this.state.logOut()
    }
  }

  render = () => (
    <StateProvider value={this.state}>{this.props.children}</StateProvider>
  )
}

export default State
export { StateConsumer }
