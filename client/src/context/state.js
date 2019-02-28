import React, { createContext, Component } from "react"
import ls from "local-storage"
import sample from "lodash/sample"
import { isAuthenticated, getUser } from "../api"
import { alreadyInLocalStorage } from "../utils"
const { Provider: StateProvider, Consumer: StateConsumer } = createContext()

const CURRENT_SONGS = [
  {
    album_image: {
      height: 640,
      url: "https://i.scdn.co/image/33dd861169e8474884bc9fcde90c6ec79cf691b9",
      width: 640
    },
    title: "Cutlass Cruiser",
    artist: "TOPS",
    link: "https://open.spotify.com/track/6rnMwp1TDEw8wwbX7S9Ot9"
  },
  {
    album_image: {
      height: 640,
      url: "https://i.scdn.co/image/e2df238c20591b8814f01842a987f69abc96c8ae",
      width: 640
    },
    title: "Bustin Loose (feat. Saara Maria & Austin Antione)",
    artist: "Joomanji",
    link: "https://open.spotify.com/track/0p1ZvKFcy7tRv9n6G9MQv1"
  },
  {
    album_image: {
      height: 640,
      url: "https://i.scdn.co/image/8f95749065a768db1902245c4f89e8da89b07657",
      width: 640
    },
    title: "Come and Be a Winner",
    artist: "Sharon Jones & The Dap-Kings",
    link: "https://open.spotify.com/track/5mC5TUumk179DX1gduud3b"
  },
  {
    album_image: {
      height: 640,
      url: "https://i.scdn.co/image/8120e3c26609f4063b23acf43fd5cc0add41442d",
      width: 640
    },
    title: "Tezeta (Nostalgia)",
    artist: "Mulatu Astatke",
    link: "https://open.spotify.com/track/414J8tKHbtF16XOiHGBEso"
  }
]

class State extends Component {
  state = {
    selectedSong: false,
    correctSong: CURRENT_SONGS[3],
    loggedIn: undefined,
    currentSongs: CURRENT_SONGS,
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
      this.setState({ currentQuote })
    },
    setUser: user => {
      ls.set("user", user)
      this.setState({ user })
    },
    selectSong: selectedSong => {
      ls.set("selectedSong", selectedSong)
      this.setState({ selectedSong })
    },
    chooseNewCorrectSong: () => {
      const nextCorrectSong = sample(CURRENT_SONGS)
      ls.set("correctSong", nextCorrectSong)
      this.setState({ correctSong: nextCorrectSong })
    },
    adjustScore: increase => {
      const { count, correct } = this.state.score
      const newScore = {
        count: count + 1,
        correct: increase ? correct + 1 : correct
      }
      ls.set("score", newScore)
      this.setState({ score: newScore })
    },
    resetScore: () => {
      const newScore = {
        count: 0,
        correct: 0
      }
      ls.set("score", newScore)
      this.setState({ score: newScore })
    },
    logIn: () => {
      this.setState({ loggedIn: true })
    },
    logOut: () => {
      this.setState({ loggedIn: false })
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
