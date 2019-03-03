import React, { Component } from "react"
import { css } from "emotion"
import Button from "./button"
import { mq } from "../styles/"
import { StateConsumer } from "../context/state"
import { ColorWashConsumer } from "../context/color-wash"

const gameInfoWrapperStyle = css({
  flex: 1,
  display: "flex",
  flexWrap: "wrap"
})

const songInfoWrapperStyle = background =>
  css(
    mq({
      display: "flex",
      alignItems: "center",
      color: "white",
      transition: "background 300ms ease",
      background,
      padding: "16px 24px",
      marginRight: 20,
      marginBottom: 10
    })
  )

const spotifyLogoStyle = css({
  marginRight: 8,
  width: 23,
  height: 23
})

const socialLinkWrapper = disabled =>
  css({
    opacity: disabled ? 0.3 : 1,
    display: "flex",
    alignItems: "center",
    marginLeft: 20,
    color: "white",
    textDecoration: "none",
    marginRight: 10,
    "&:hover": {
      textDecoration: "underline"
    }
  })

const nextSongStyle = css({
  marginBottom: 10,
  marginRight: 20
})

const scoreStyle = css({
  fontWeight: "bold",
  fontSize: 28
})

const SocialLink = ({ url, image, disabled, children }) => (
  <a
    href={disabled ? null : url}
    target="_blank"
    rel="noopener noreferrer"
    className={socialLinkWrapper(disabled)}
  >
    <img alt="" className={spotifyLogoStyle} src={image} />
    {children}
  </a>
)

class Songs extends Component {
  render() {
    return (
      <StateConsumer>
        {({
          goToNextSong,
          resetGame,
          score,
          selectedSong,
          correctSong,
          lyricsUrl
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
                  <SocialLink
                    image={process.env.PUBLIC_URL + "/images/spotify-logo.png"}
                    disabled={!selectedSong}
                    url={correctSong.link}
                  >
                    Spotify link
                  </SocialLink>
                  <SocialLink
                    image={process.env.PUBLIC_URL + "/images/genius-logo.png"}
                    disabled={!selectedSong}
                    url={lyricsUrl}
                  >
                    Genius link
                  </SocialLink>
                </div>
                <Button
                  className={nextSongStyle}
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
                  className={nextSongStyle}
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
