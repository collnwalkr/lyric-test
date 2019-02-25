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
            {({ changeBackground }) => (
              <div className={albumsWrapperStyle}>
                {currentSongs.map((songObj, index) => (
                  <Song
                    key={index}
                    selected={songObj.song === selectedSong}
                    onClick={(palette, song) => {
                      changeBackground(palette.darkMuted)
                      selectSong(song)
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
