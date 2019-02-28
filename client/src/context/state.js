import React, { createContext, Component } from "react"
import ls from "local-storage"
import sample from "lodash/sample"
import sampleSize from "lodash/sampleSize"
import { isAuthenticated, getUser } from "../api"
import { alreadyInLocalStorage } from "../utils"
import { getRecent } from "../api"
const { Provider: StateProvider, Consumer: StateConsumer } = createContext()

// const CURRENT_SONGS = [
//   {
//     album_image:
//       "https://i.scdn.co/image/33dd861169e8474884bc9fcde90c6ec79cf691b9",
//     title: "Cutlass Cruiser",
//     artist: "TOPS",
//     link: "https://open.spotify.com/track/6rnMwp1TDEw8wwbX7S9Ot9"
//   },
//   {
//     album_image:
//       "https://i.scdn.co/image/e2df238c20591b8814f01842a987f69abc96c8ae",
//     title: "Bustin Loose (feat. Saara Maria & Austin Antione)",
//     artist: "Joomanji",
//     link: "https://open.spotify.com/track/0p1ZvKFcy7tRv9n6G9MQv1"
//   },
//   {
//     album_image:
//       "https://i.scdn.co/image/8f95749065a768db1902245c4f89e8da89b07657",
//     title: "Come and Be a Winner",
//     artist: "Sharon Jones & The Dap-Kings",
//     link: "https://open.spotify.com/track/5mC5TUumk179DX1gduud3b"
//   },
//   {
//     album_image:
//       "https://i.scdn.co/image/8120e3c26609f4063b23acf43fd5cc0add41442d",
//     title: "Tezeta (Nostalgia)",
//     artist: "Mulatu Astatke",
//     link: "https://open.spotify.com/track/414J8tKHbtF16XOiHGBEso"
//   }
// ]

class State extends Component {
  setStatePromise = newState =>
    new Promise(resolve => {
      this.setState(newState, () => {
        resolve()
      })
    })

  state = {
    selectedSong: false,
    correctSong: {},
    loggedIn: undefined,
    currentSongs: [],
    availableSongs: [],
    score: {
      count: 0,
      correct: 0
    },
    currentQuote: [
      "Now I wanna know how you taste (Mmm-mmm)",
      "Usually don't give it away (Yeah, yeah)"
    ],
    setQuote: currentQuote => {
      ls.set("currentQuote", currentQuote)
      return this.setStatePromise({ currentQuote })
    },
    setUser: user => {
      ls.set("user", user)
      this.setStatePromise({ user })
    },
    selectSong: selectedSong => {
      ls.set("selectedSong", selectedSong)
      return this.setStatePromise({ selectedSong })
    },
    chooseNewCorrectSong: () => {
      const { currentSongs } = this.state
      const correctSong = sample(currentSongs)
      ls.set("correctSong", correctSong)
      return this.setStatePromise({ correctSong })
    },
    chooseNewOptions: () => {
      const { availableSongs, correctSong } = this.state
      const nextAvailableSongs = availableSongs.filter(
        ({ title }) => title !== correctSong.title
      )
      const currentSongs = sampleSize(nextAvailableSongs, 4)
      ls.set("currentSongs", currentSongs)
      ls.set("availableSongs", nextAvailableSongs)
      return this.setStatePromise({
        currentSongs,
        availableSongs: nextAvailableSongs
      })
    },
    adjustScore: increase => {
      const { count, correct } = this.state.score
      const newScore = {
        count: count + 1,
        correct: increase ? correct + 1 : correct
      }
      ls.set("score", newScore)
      return this.setStatePromise({ score: newScore })
    },
    resetScore: () => {
      const newScore = {
        count: 0,
        correct: 0
      }
      ls.set("score", newScore)
      return this.setStatePromise({ score: newScore })
    },
    logIn: () => {
      return this.setStatePromise({ loggedIn: true })
    },
    logOut: () => {
      return this.setStatePromise({ loggedIn: false })
    },
    goToNextSong: async () => {
      await this.state.chooseNewOptions()
      await this.state.chooseNewCorrectSong()
      await this.state.selectSong(false)
    },
    resetGame: async () => {
      const { data: availableSongs } = await getRecent()
      const currentSongs = sampleSize(availableSongs, 4)
      ls.set("currentSongs", currentSongs)
      ls.set("availableSongs", availableSongs)
      await this.setStatePromise({ currentSongs, availableSongs })
      await this.state.chooseNewCorrectSong()
      await this.state.selectSong(false)
      await this.state.resetScore()
    }
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
