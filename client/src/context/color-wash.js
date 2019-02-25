import React, { createContext, Component } from "react"
import ls from "local-storage"
import { alreadyInLocalStorage } from "../utils"
const {
  Provider: ColorWashProvider,
  Consumer: ColorWashConsumer
} = createContext()

class ColorWash extends Component {
  state = {
    backgroundColor: "#E1E1E1",
    changeBackground: backgroundColor => {
      ls.set("backgroundColor", backgroundColor)
      this.setState({ backgroundColor })
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
