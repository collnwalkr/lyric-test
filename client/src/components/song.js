import React, { Component } from "react"
import { css } from "emotion"
import Palette from "react-palette"
import { getPalette, mq } from "../styles"

const SONG_WIDTHS = [270, 270, 200, 270]
const DETAIL_FONT_SIZES = [14, 18]

const songWrapperStyle = (madeASelection, selected, correct) =>
  css(
    mq({
      position: "relative",
      opacity: !madeASelection || correct ? 1 : 0.4,
      mixBlendMode: !madeASelection || correct ? "normal" : "luminosity",
      cursor: !madeASelection ? "pointer" : null,
      marginBottom: 15,
      marginRight: 20,
      lineHeight: 1.2,
      color: "white",
      maxWidth: `calc(50% - 20px)`,
      flexBasis: SONG_WIDTHS,
      transition: "transform 150ms ease",
      transform: madeASelection && correct ? ["scale(1)", "scale(1.03)"] : null,
      "&:hover": {
        transform: !madeASelection ? ["scale(1)", "scale(1.03)"] : null
      }
    })
  )

const songLineStyle = palette =>
  css(
    mq({
      fontSize: DETAIL_FONT_SIZES,
      padding: 8,
      backgroundColor: palette.darkVibrant,
      marginBottom: 5
    })
  )

const artistLineStyle = palette =>
  css(
    mq({
      fontSize: DETAIL_FONT_SIZES,
      padding: 8,
      backgroundColor: palette.darkVibrant
    })
  )

const imageStyle = imageUrl =>
  css(
    mq({
      backgroundImage: `url(${imageUrl})`,
      backgroundColor: "#191919",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      maxWidth: "100%",
      width: SONG_WIDTHS,
      paddingTop: "100%",
      marginBottom: 5
    })
  )

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
              <div className={imageStyle(album_image)} />
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
