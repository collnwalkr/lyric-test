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

class Song extends Component {
  render() {
    const { image, artist, song, selected, onClick } = this.props

    return (
      <Palette image={image}>
        {derivedPalette => {
          const palette = {
            ...defaultPalette,
            ...omitBy(derivedPalette, isNil)
          }
          return (
            <div
              className={songWrapperStyle(selected)}
              onClick={() => onClick(palette, song)}
            >
              <img
                src={image}
                alt={`${song} by ${artist}`}
                style={{ maxWidth: "100%" }}
              />
              <div className={songLineStyle(palette)}>{song}</div>
              <div className={artistLineStyle(palette)}>{artist}</div>
            </div>
          )
        }}
      </Palette>
    )
  }
}

export default Song
