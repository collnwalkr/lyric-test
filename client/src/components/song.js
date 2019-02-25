import React, { Component } from "react"
import { css } from "emotion"
import omitBy from "lodash/omitBy"
import isNil from "lodash/isNil"
import Palette from "react-palette"

const defaultPalette = {
  darkMuted: "#333",
  lightMuted: "#DDD",
  darkVibrant: "#222",
  vibrant: "#FFF",
  lightVibrant: "#FFA"
}

const songWrapperStyle = selected =>
  css({
    opacity: selected ? 1 : 0.4,
    mixBlendMode: selected ? "normal" : "luminosity",
    marginBottom: 15,
    marginRight: 20,
    width: "40%",
    color: "white",
    maxWidth: 270
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

const imageStyle = css({
  width: "100%"
})

const imageWrapperStyle = css({
  maxWidth: "100%",
  width: 270,
  minHeight: 270
})

class Song extends Component {
  render() {
    const { album_image, artist, title, selected, onClick } = this.props
    return (
      <Palette image={album_image.url}>
        {derivedPalette => {
          const palette = {
            ...defaultPalette,
            ...omitBy(derivedPalette, isNil)
          }
          return (
            <div
              className={songWrapperStyle(selected)}
              onClick={() => onClick(palette, title)}
            >
              <div className={imageWrapperStyle}>
                <img
                  src={album_image.url}
                  alt={`${title} by ${artist} album cover`}
                  className={imageStyle}
                />
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
