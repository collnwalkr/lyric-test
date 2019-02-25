import React from "react"
import { css } from "emotion"

const wrapperStyle = css({
  position: "absolute",
  top: 0,
  right: 0
})

const Header = ({ children }) => <div className={wrapperStyle}>{children}</div>

export default Header
