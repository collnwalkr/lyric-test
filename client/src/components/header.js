import React from "react"
import { css } from "emotion"

const wrapperStyle = css({
  position: "absolute",
  top: 10,
  right: 20
})

const Header = ({ children }) => <div className={wrapperStyle}>{children}</div>

export default Header
