import React, { Component } from "react"
import { css } from "emotion"
import { getRecent } from "../api"
import { ColorWashConsumer } from "../context/color-wash"
import Songs from "../components/songs"
import Quote from "../components/quote"
import GameInfo from "../components/game-info"

const gameWrapperStyle = backgroundColor =>
  css({
    backgroundColor,
    width: "100%",
    paddingTop: 20,
    paddingLeft: 20
  })

class Game extends Component {
  componentDidMount() {
    // getRecent().then(({ data }) => {
    //   console.log("data", data)
    // })
  }

  render() {
    return (
      <ColorWashConsumer>
        {({ currentPalette }) => (
          <div className={gameWrapperStyle(currentPalette.darkMuted)}>
            <Quote />
            <Songs />
            <GameInfo />
          </div>
        )}
      </ColorWashConsumer>
    )
  }
}

export default Game
