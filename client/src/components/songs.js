import React from "react"
import { css } from "emotion"
import Palette from "react-palette"
import Song from "./song"
import { StateConsumer } from "../context/state"
import { ColorWashConsumer } from "../context/color-wash"
import { getPalette, mq } from "../styles"

const albumsWrapperStyle = css(
  mq({
    flex: 0,
    flexBasis: 1165,
    display: "flex",
    flexWrap: "wrap",
    marginBottom: [10, 10, 50]
  })
)

const Songs = () => (
  <StateConsumer>
    {({
      songOptions,
      correctSong,
      selectedSong,
      setSelectedSong,
      adjustScore
    }) => (
      <ColorWashConsumer>
        {({ changePalette }) => (
          <Palette image={correctSong.album_image}>
            {derivedPalette => {
              const palette = getPalette(derivedPalette)
              return (
                <div className={albumsWrapperStyle}>
                  {songOptions.map((songObj, index) => (
                    <Song
                      key={index}
                      correct={songObj.title === correctSong.title}
                      selected={songObj.title === selectedSong}
                      madeASelection={selectedSong}
                      onClick={title => {
                        if (!selectedSong) {
                          changePalette(palette)
                          setSelectedSong(title)
                          window.scrollTo({
                            top: document.body.scrollHeight,
                            behavior: "smooth"
                          })
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

export default Songs
