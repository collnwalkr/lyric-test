import React, { Component } from "react"
import { css } from "emotion"
import Palette from "react-palette"
import { getPalette } from "../styles"

const songWrapperStyle = (madeASelection, selected, correct) =>
  css({
    position: "relative",
    opacity: !madeASelection || correct ? 1 : 0.4,
    mixBlendMode: !madeASelection || correct ? "normal" : "luminosity",
    cursor: !madeASelection ? "pointer" : null,
    marginBottom: 15,
    marginRight: 20,
    lineHeight: 1.2,
    color: "white",
    maxWidth: `calc(50% - 20px)`,
    flexBasis: 270,
    transition: "transform 150ms ease",
    transform: madeASelection && correct ? "scale(1.03)" : null,
    "&:hover": {
      transform: !madeASelection ? "scale(1.03)" : null
    }
  })

const songLineStyle = palette =>
  css({
    padding: 8,
    backgroundColor: palette.darkVibrant,
    marginBottom: 5
  })

const artistLineStyle = palette =>
  css({
    padding: 8,
    backgroundColor: palette.darkVibrant
  })

const incorrectEmojiStyle = css({
  fontSize: 100,
  height: 0,
  position: "absolute",
  top: 0,
  bottom: 100,
  left: 0,
  right: 0,
  textAlign: "center",
  lineHeight: 0.5,
  margin: "auto"
})

const imageStyle = imageUrl =>
  css({
    backgroundImage: `url(${imageUrl})`,
    backgroundColor: "#191919",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    maxWidth: "100%",
    width: 270,
    paddingTop: "100%",
    marginBottom: 5
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center"
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
      <Palette image={album_image}>
        {derivedPalette => {
          const palette = getPalette(derivedPalette)
          return (
            <div
              className={songWrapperStyle(madeASelection, selected, correct)}
              onClick={() => onClick(title)}
            >
              <div className={imageStyle(album_image)}>
                {selected && !correct && (
                  <span className={incorrectEmojiStyle}>❌</span>
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
