import React, { Component } from "react"
import { css } from "emotion"
import Palette from "react-palette"
import { getPalette } from "../styles"

const songWrapperStyle = (madeASelection, selected, correct) =>
  css({
    opacity: !madeASelection || selected || correct ? 1 : 0.4,
    mixBlendMode:
      !madeASelection || selected || correct ? "normal" : "luminosity",
    cursor: !madeASelection ? "pointer" : null,
    marginBottom: 15,
    marginRight: 20,
    width: "40%",
    color: "white",
    maxWidth: 270,
    transition: "transform 150ms ease",
    transform: !madeASelection || selected || correct ? "scale(1.03)" : null,
    "&:hover": {
      transform: !madeASelection || selected || correct ? "scale(1.03)" : null
    }
  })

const songLineStyle = palette =>
  css({
    padding: 4,
    backgroundColor: palette.darkVibrant,
    marginBottom: 5
  })

const artistLineStyle = palette =>
  css({
    padding: 4,
    backgroundColor: palette.darkVibrant
  })

const incorrectEmojiStyle = css({
  fontSize: 100
})

const imageStyle = imageUrl =>
  css({
    backgroundImage: `url(${imageUrl})`,
    backgroundColor: "#CCC",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    maxWidth: "100%",
    width: 270,
    minHeight: 270,
    marginBottom: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  })

class Song extends Component {
  render() {
    const {
      album_image,
      artist,
      title,
      selected,
      onClick,
      madeASelection,
      correct
    } = this.props
    return (
      <Palette image={album_image.url}>
        {derivedPalette => {
          const palette = getPalette(derivedPalette)
          return (
            <div
              className={songWrapperStyle(madeASelection, selected, correct)}
              onClick={() => onClick(title)}
            >
              <div className={imageStyle(album_image.url)}>
                {selected && !correct && (
                  <span className={incorrectEmojiStyle}>🥴</span>
                )}
              </div>
              <div className={songLineStyle(palette)}>{title}</div>
              <div className={artistLineStyle(palette)}>{artist}</div>
            </div>
          )
        }}
      </Palette>
    )
  }
}

export default Song
