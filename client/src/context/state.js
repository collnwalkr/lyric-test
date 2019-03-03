import React, { createContext, Component } from "react"
import ls from "local-storage"
import sample from "lodash/sample"
import sampleSize from "lodash/sampleSize"
import random from "lodash/random"
import isEmpty from "lodash/isEmpty"
import { isAuthenticated, getUser } from "../api"
import { alreadyInLocalStorage, ERRORS } from "../utils"
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

  setStateAndLocal = async state => {
    Object.keys(state).forEach(key => {
      ls.set(key, state[key])
    })
    await this.setStatePromise(state)
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
    gameOver: false,
    loading: false,
    setQuote: quote => {
      return this.setStateAndLocal({ quote })
    },
    setLyricsUrl: lyricsUrl => {
      return this.setStateAndLocal({ lyricsUrl })
    },
    setUser: user => {
      return this.setStateAndLocal({ user })
    },
    setSelectedSong: selectedSong => {
      return this.setStateAndLocal({ selectedSong })
    },
    setCorrectSong: correctSong => {
      return this.setStateAndLocal({ correctSong })
    },
    setSongOptions: songOptions => {
      return this.setStateAndLocal({ songOptions })
    },
    setAvailableSongs: availableSongs => {
      return this.setStateAndLocal({ availableSongs })
    },
    setNextSongOptions: nextSongOptions => {
      return this.setStateAndLocal({ nextSongOptions })
    },
    setNextSong: nextSong => {
      return this.setStateAndLocal({ nextSong })
    },
    setNextLyricsUrl: nextLyricsUrl => {
      return this.setStateAndLocal({ nextLyricsUrl })
    },
    setNextQuote: nextQuote => {
      return this.setStateAndLocal({ nextQuote })
    },
    setNextAvailableSongs: nextAvailableSongs => {
      return this.setStateAndLocal({ nextAvailableSongs })
    },
    setScore: score => {
      return this.setStateAndLocal({ score })
    },
    setGameOver: gameOver => {
      return this.setStateAndLocal({ gameOver })
    },
    setLoggedIn: loggedIn => {
      return this.setStatePromise({ loggedIn })
    },
    setLoading: loading => {
      return this.setStatePromise({ loading })
    },
    adjustScore: increase => {
      const { count, correct } = this.state.score
      this.state.setScore({
        count: count + 1,
        correct: increase ? correct + 1 : correct
      })
    },
    goToNextSong: async () => {
      const nextAlreadyQueued = this.nextQuestionReady()
      // if we already have the next question set up, use that
      if (!nextAlreadyQueued) {
        console.log("start loading")
        this.state.setLoading(true)
      }
      try {
        const {
          nextSong,
          nextQuote,
          nextSongOptions,
          nextAvailableSongs,
          nextLyricsUrl
        } = nextAlreadyQueued
          ? this.state
          : await this.getQuestion(this.state.correctSong)
        await this.resetNextQuestion()
        await this.setStateAndLocal({
          songOptions: nextSongOptions,
          quote: nextQuote,
          lyricsUrl: nextLyricsUrl,
          availableSongs: nextAvailableSongs,
          correctSong: nextSong
        })
        await this.state.setSelectedSong(false)
        if (!nextAlreadyQueued) {
          console.log("stop loading")
          this.state.setLoading(false)
        }
        this.scrollToTop()
        this.getNextQuestion()
      } catch (error) {
        if (error === ERRORS.NO_MORE_SONGS) {
          console.log("done with go to next song")
          this.state.setGameOver(true)
        }
      }
    },
    resetGame: async () => {
      await this.state.setLoading(true)
      const { data: availableSongs } = await getRecent()
      // await this.state.setAvailableSongs(sampleSize(availableSongs, 5))
      await this.state.setAvailableSongs(availableSongs)
      const {
        nextSong,
        nextQuote,
        nextSongOptions,
        nextAvailableSongs,
        nextLyricsUrl
      } = await this.getQuestion({})
      await this.setStateAndLocal({
        songOptions: nextSongOptions,
        quote: nextQuote,
        lyricsUrl: nextLyricsUrl,
        availableSongs: nextAvailableSongs,
        correctSong: nextSong
      })
      await this.setStateAndLocal({
        song: false,
        gameOver: false
      })
      await this.resetScore()
      await this.state.setLoading(false)
      this.scrollToTop()
      this.getNextQuestion()
    },
    logOut: async () => {
      await this.state.setLoggedIn(false)
      await this.clearGame()
      await this.state.setGameOver(true)
    }
  }

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  getNextQuestion = async () => {
    const { correctSong: currentCorrectSong } = this.state
    try {
      const {
        nextSong,
        nextQuote,
        nextSongOptions,
        nextAvailableSongs,
        nextLyricsUrl
      } = await this.getQuestion(currentCorrectSong)
      await this.setStateAndLocal({
        nextSongOptions,
        nextQuote,
        nextLyricsUrl,
        nextAvailableSongs,
        nextSong
      })
    } catch (error) {
      if (error === ERRORS.NO_MORE_SONGS) {
        this.state.setGameOver(true)
        console.log("done with get next question")
      }
    }
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
    return (
      !isEmpty(nextSong) &&
      !isEmpty(nextQuote) &&
      !isEmpty(nextSongOptions) &&
      !isEmpty(nextAvailableSongs) &&
      nextLyricsUrl !== ""
    )
  }

  getQuestion = async (songToExclude = {}) => {
    let { availableSongs } = this.state,
      getRidOfSong = songToExclude,
      nextAvailableSongs = [],
      nextSongOptions = [],
      nextSong = {},
      response = {},
      nextQuote = false,
      nextLyricsUrl = ""
    while (!nextQuote) {
      nextAvailableSongs = availableSongs.filter(
        ({ title }) => title !== getRidOfSong.title
      )
      nextSongOptions = sampleSize(nextAvailableSongs, 4)
      nextSong = sample(nextSongOptions)
      // if no more songs, break and throw error
      if (!nextSong) {
        throw ERRORS.NO_MORE_SONGS
      }
      response = await this.getSongQuote(nextSong.artist, nextSong.title)
      nextQuote = response.quote
      nextLyricsUrl = response.url
      // if no quote, set up this song to be ignored in
      // the next list of available songs
      if (!nextQuote) {
        getRidOfSong = nextSong
        availableSongs = nextAvailableSongs
      }
    }
    return {
      nextSong,
      nextQuote,
      nextSongOptions,
      nextAvailableSongs,
      nextLyricsUrl
    }
  }

  resetNextQuestion = () => {
    return this.setStateAndLocal({
      nextSongOptions: [],
      nextQuote: [],
      nextLyricsUrl: "",
      nextSong: {}
    })
  }

  clearGame = () => {
    return this.setStateAndLocal({
      songOptions: [],
      quote: [],
      lyricsUrl: "",
      correctSong: {},
      selectedSong: false,
      nextSongOptions: [],
      nextQuote: [],
      nextLyricsUrl: "",
      nextSong: {},
      score: {
        count: 0,
        correct: 0
      },
      gameOver: false
    })
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
      const { data: user } = await getUser()
      await this.state.setUser(user)
      this.state.setLoggedIn(true)
    } catch (error) {
      this.state.setLoggedIn(false)
    }
  }

  render = () => (
    <StateProvider value={this.state}>{this.props.children}</StateProvider>
  )
}

export default State
export { StateConsumer }
