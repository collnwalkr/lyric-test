import React, { createContext, Component } from "react"
import ls from "local-storage"
import { alreadyInLocalStorage } from "../utils"
const {
  Provider: ColorWashProvider,
  Consumer: ColorWashConsumer
} = createContext()

const defaultPalette = {
  darkMuted: "#191919",
  lightMuted: "#DDD",
  darkVibrant: "#222",
  vibrant: "#FFF",
  lightVibrant: "#FFF"
}

class ColorWash extends Component {
  state = {
    backgroundColor: "#E1E1E1",
    currentPalette: defaultPalette,
    changePalette: currentPalette => {
      ls.set("currentPalette", currentPalette)
      this.setState({ currentPalette })
    },
    resetPalette: () => {
      ls.set("currentPalette", defaultPalette)
      this.setState({ currentPalette: defaultPalette })
    }
  }

  componentDidMount = async () => {
    this.setState(alreadyInLocalStorage())
  }

  render() {
    return (
      <ColorWashProvider value={this.state}>
        {this.props.children}
      </ColorWashProvider>
    )
  }
}

export default ColorWash
export { ColorWashConsumer }
