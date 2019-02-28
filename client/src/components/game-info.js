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

const spotifyLogoStyle = css({
  marginRight: 8,
  width: 23,
  height: 23
})

const spotifyLinkWrapper = disabled =>
  css({
    opacity: disabled ? 0.3 : 1,
    display: "flex",
    alignItems: "center",
    marginLeft: 20,
    color: "white",
    textDecoration: "none",
    marginRight: 10
  })

const scoreStyle = css({
  fontWeight: "bold",
  fontSize: 28
})

const SpotifyLink = ({ url, disabled }) => (
  <a
    href={disabled ? null : url}
    target="_blank"
    rel="noopener noreferrer"
    className={spotifyLinkWrapper(disabled)}
  >
    <img
      alt=""
      className={spotifyLogoStyle}
      src={process.env.PUBLIC_URL + "/images/spotify-logo.png"}
    />
    Spotify link
  </a>
)

class Songs extends Component {
  render() {
    return (
      <StateConsumer>
        {({ goToNextSong, resetGame, score, selectedSong, correctSong }) => (
          <ColorWashConsumer>
            {({ currentPalette, resetPalette }) => (
              <div className={gameInfoWrapperStyle}>
                <div
                  className={songInfoWrapperStyle(currentPalette.darkVibrant)}
                >
                  <p className={scoreStyle}>{`${score.correct}/${
                    score.count
                  }`}</p>
                  <SpotifyLink
                    disabled={!selectedSong}
                    url={correctSong.link}
                  />
                </div>
                <Button
                  disabled={!selectedSong}
                  color={currentPalette.lightVibrant}
                  onClick={() => {
                    goToNextSong()
                    resetPalette()
                  }}
                >
                  Next Song
                </Button>
                <Button
                  color={"red"}
                  onClick={() => {
                    resetGame()
                    resetPalette()
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
