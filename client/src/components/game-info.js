import React, { Component } from "react"
import { css } from "emotion"
import Button from "./button"
import { StateConsumer } from "../context/state"
import { ColorWashConsumer } from "../context/color-wash"

const gameInfoWrapperStyle = css({
  display: "flex",
  flexWrap: "wrap"
})

const songInfoWrapperStyle = background =>
  css({
    display: "flex",
    alignItems: "center",
    color: "white",
    background,
    padding: "16px 24px"
  })

const scoreStyle = css({
  fontWeight: "bold",
  fontSize: 28
})

class Songs extends Component {
  render() {
    return (
      <StateConsumer>
        {({
          selectSong,
          chooseNewCorrectSong,
          correctSong,
          selectedSong,
          resetScore,
          score
        }) => (
          <ColorWashConsumer>
            {({ currentPalette, resetPalette }) => (
              <div className={gameInfoWrapperStyle}>
                <div
                  className={songInfoWrapperStyle(currentPalette.darkVibrant)}
                >
                  <p className={scoreStyle}>{`${score.correct}/${
                    score.count
                  }`}</p>
                </div>
                <Button
                  color={currentPalette.lightVibrant}
                  onClick={() => {
                    chooseNewCorrectSong()
                    resetPalette()
                    selectSong(false)
                  }}
                >
                  Next Song
                </Button>
                <Button
                  color={"red"}
                  onClick={() => {
                    chooseNewCorrectSong()
                    resetPalette()
                    selectSong(false)
                    resetScore()
                  }}
                >
                  New Game
                </Button>
              </div>
            )}
          </ColorWashConsumer>
        )}
      </StateConsumer>
    )
  }
}

export default Songs
