import React, { Component } from "react"
import { css } from "emotion"
import Palette from "react-palette"
import Song from "./song"
import { StateConsumer } from "../context/state"
import { ColorWashConsumer } from "../context/color-wash"
import { getPalette } from "../styles"

const albumsWrapperStyle = css({
  display: "flex",
  flexWrap: "wrap"
})

class Songs extends Component {
  render() {
    return (
      <StateConsumer>
        {({
          currentSongs,
          correctSong,
          selectedSong,
          selectSong,
          adjustScore
        }) => (
          <ColorWashConsumer>
            {({ changePalette }) => (
              <Palette image={correctSong.album_image}>
                {derivedPalette => {
                  const palette = getPalette(derivedPalette)
                  return (
                    <div className={albumsWrapperStyle}>
                      {currentSongs.map((songObj, index) => (
                        <Song
                          key={index}
                          correct={songObj.title === correctSong.title}
                          selected={songObj.title === selectedSong}
                          madeASelection={selectedSong}
                          onClick={title => {
                            if (!selectedSong) {
                              changePalette(palette)
                              selectSong(title)
                              adjustScore(correctSong.title === title)
                            }
                          }}
                          {...songObj}
                        />
                      ))}
                    </div>
                  )
                }}
              </Palette>
            )}
          </ColorWashConsumer>
        )}
      </StateConsumer>
    )
  }
}

export default Songs
