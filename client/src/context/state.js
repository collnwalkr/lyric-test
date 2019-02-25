import React, { createContext, Component } from "react"
import ls from "local-storage"
import { isAuthenticated, getUser } from "../api"
import { alreadyInLocalStorage } from "../utils"
const { Provider: StateProvider, Consumer: StateConsumer } = createContext()

const CURRENT_SONGS = [
  {
    image: process.env.PUBLIC_URL + "/images/Bitmap.png",
    artist: "Ariana Grande",
    song: "break up with your girlfriend, i'm bored"
  },
  {
    image: process.env.PUBLIC_URL + "/images/Bitmap2.png",
    artist: "Travis Scott",
    song: "SICKO MODE"
  },
  {
    image: process.env.PUBLIC_URL + "/images/Bitmap3.png",
    artist: "Khalid",
    song: "Talk"
  },
  {
    image: process.env.PUBLIC_URL + "/images/Bitmap4.png",
    artist: "Ariana Grande",
    song: "thank u, next"
  }
]

class State extends Component {
  state = {
    selectedSong: undefined,
    loggedIn: undefined,
    currentSongs: CURRENT_SONGS,
    currentQuote: [
      "Now I wanna know how you taste (Mmm-mmm)",
      "Usually don't give it away (Yeah, yeah)"
    ],
    setUser: user => {
      ls.set("user", user)
      this.setState({ user })
    },
    selectSong: selectedSong => {
      ls.set("selectedSong", selectedSong)
      this.setState({ selectedSong })
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
      this.state.logIn()
    } catch (error) {
      this.state.logOut()
    }
    try {
      if (!ls.get("user")) {
        const { data: user } = await getUser()
        this.state.setUser(user)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  render = () => (
    <StateProvider value={this.state}>{this.props.children}</StateProvider>
  )
}

export default State
export { StateConsumer }
