import React, { Component } from "react"
import { css } from "emotion"
import Button from "./button"
import { mq } from "../styles/"
import { StateConsumer } from "../context/state"
import mobile from "is-mobile"
import { ColorWashConsumer } from "../context/color-wash"

const gameInfoWrapperStyle = css(
  mq({
    display: "flex",
    flexBasis: 1165,
    maxWidth: "100%",
    flexWrap: "wrap",
    flexDirection: ["column-reverse", "column-reverse", "row"],
    justifyContent: ["flex-start", "flext-start", "flex-start", "flex-end"]
  })
)

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
      textDecoration: !disabled && "underline"
    }
  })

const nextSongStyle = css(
  mq({
    width: ["100%", "inherit"],
    marginBottom: 10,
    marginRight: 20
  })
)

const scoreStyle = css({
  fontWeight: "bold",
  fontSize: 28
})

const SocialLink = ({ url, image, disabled, children, target }) => (
  <a
    href={disabled ? null : url}
    target={target}
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
          lyricsUrl,
          loading
        }) => (
          <ColorWashConsumer>
            {({ currentPalette, resetPalette, gameOver }) => (
              <div className={gameInfoWrapperStyle}>
                <div
                  className={songInfoWrapperStyle(currentPalette.darkVibrant)}
                >
                  <p className={scoreStyle}>{`${score.correct}/${
                    score.count
                  }`}</p>
                  <SocialLink
                    target={mobile() ? null : "_blank"}
                    image={process.env.PUBLIC_URL + "/images/spotify-logo.png"}
                    disabled={!selectedSong}
                    url={correctSong.link}
                  >
                    Spotify
                  </SocialLink>
                  <SocialLink
                    target="_blank"
                    image={process.env.PUBLIC_URL + "/images/genius-logo.png"}
                    disabled={!selectedSong}
                    url={lyricsUrl}
                  >
                    Genius
                  </SocialLink>
                </div>
                <Button
                  className={nextSongStyle}
                  disabled={!selectedSong || loading}
                  color={currentPalette.lightVibrant}
                  onClick={() => {
                    goToNextSong()
                    resetPalette()
                  }}
                >
                  Next Song
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
