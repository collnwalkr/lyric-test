import React, { Component } from "react"
import { css } from "emotion"
import { Link } from "react-router-dom"
import { mq } from "../styles/"
import { ColorWashConsumer } from "../context/color-wash"
import Header from "../components/header"
import Songs from "../components/songs"
import GameOver from "../components/game-over"
import Quote from "../components/quote"
import GameInfo from "../components/game-info"

const gameWrapperStyle = backgroundColor =>
  css(
    mq({
      transition: "background-color 300ms ease",
      backgroundColor,
      width: "100%",
      boxSizing: "border-box",
      paddingTop: 30,
      paddingLeft: [10, 20],
      paddingRight: [10, 20]
    })
  )

const playAreaWrapperStyle = css({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start"
})

const linkStyle = css({
  fontSize: 14,
  color: "#7aafff",
  textDecoration: "none",
  "&: hover": {
    textDecoration: "none",
    color: "#96c0ff"
  }
})

class Game extends Component {
  render() {
    return (
      <ColorWashConsumer>
        {({ currentPalette }) => (
          <React.Fragment>
            <Header>
              <Link to="/" className={linkStyle}>
                Home
              </Link>
            </Header>
            <div className={gameWrapperStyle(currentPalette.darkMuted)}>
              <GameOver />
              <Quote />
              <div className={playAreaWrapperStyle}>
                <Songs />
                <GameInfo />
              </div>
            </div>
          </React.Fragment>
        )}
      </ColorWashConsumer>
    )
  }
}

export default Game
