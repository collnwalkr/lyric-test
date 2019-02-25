import React, { Component } from "react"
import { css } from "emotion"
import Song from "./song"
import { StateConsumer } from "../context/state"
import { ColorWashConsumer } from "../context/color-wash"

const albumsWrapperStyle = css({
  display: "flex",
  flexWrap: "wrap"
})

class Songs extends Component {
  render() {
    return (
      <StateConsumer>
        {({ currentSongs, selectedSong, selectSong }) => (
          <ColorWashConsumer>
            {({ changePalette }) => (
              <div className={albumsWrapperStyle}>
                {currentSongs.map((songObj, index) => (
                  <Song
                    key={index}
                    selected={!selectedSong || songObj.title === selectedSong}
                    onClick={(palette, title) => {
                      changePalette(palette)
                      selectSong(title)
                    }}
                    {...songObj}
                  />
                ))}
              </div>
            )}
          </ColorWashConsumer>
        )}
      </StateConsumer>
    )
  }
}

export default Songs
