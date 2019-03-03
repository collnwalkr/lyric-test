// Shamelessly borrowed from https://codepen.io/shalimano/pen/wBmNGJ
import React from "react"
import { css, cx, keyframes } from "emotion"

const HEIGHT = 5
const TIMING = "2s"

const sublineStyle = css({
  position: "absolute",
  background: "#1DB954",
  height: HEIGHT
})

const increaseAnimation = keyframes`{
 from { left: -5%; width: 5%; }
 to { left: 130%; width: 100%;}
}`

const decreaseAnimation = keyframes`{
 from { left: -80%; width: 80%; }
 to { left: 110%; width: 10%;}
}`

const lineStyle = css({
  position: "absolute",
  opacity: 0.4,
  background: "#1DB954",
  width: "150%",
  height: HEIGHT
})

const increaseStyle = css({
  animation: `${increaseAnimation} ${TIMING} infinite`
})

const decreaseStyle = css({
  animation: `${decreaseAnimation} ${TIMING} 0.5s infinite`
})

const topLoaderWrapperStyle = css({
  zIndex: 1000000,
  overflow: "hidden",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: HEIGHT
})

const TopLoader = () => (
  <div className={topLoaderWrapperStyle}>
    <div className={lineStyle} />
    <div className={cx(sublineStyle, decreaseStyle)} />
    <div className={cx(sublineStyle, increaseStyle)} />
  </div>
)

export default TopLoader
