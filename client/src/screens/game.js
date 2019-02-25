import React, { Component } from "react"
import { css } from "emotion"
import State from "../context/state"
import ColorWash, { ColorWashConsumer } from "../context/color-wash"
import Songs from "../components/songs"
import Quote from "../components/quote"

const gameWrapperStyle = backgroundColor =>
  css({
    backgroundColor,
    width: "100%",
    paddingTop: 20,
    paddingLeft: 20
  })

class Game extends Component {
  render() {
    return (
      <State>
        <ColorWash>
          <ColorWashConsumer>
            {({ backgroundColor }) => {
              return (
                <div className={gameWrapperStyle(backgroundColor)}>
                  <Quote />
                  <Songs />
                </div>
              )
            }}
          </ColorWashConsumer>
        </ColorWash>
      </State>
    )
  }
}

export default Game
