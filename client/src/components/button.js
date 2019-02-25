import React from "react"
import { css } from "emotion"

const buttonStyle = color =>
  css({
    color,
    border: `5px solid ${color}`,
    display: "inline-block",
    fontFamily: "Helvetica Neue",
    fontSize: 28,
    padding: `16px 20px`,
    minWidth: 258,
    textAlign: "center",
    boxShadow: "0px 0px 8px #000",
    boxSizing: "border-box",
    margin: 0,
    textDecoration: "none",
    verticalAlign: "middle",
    cursor: "pointer",
    borderRadius: 4,
    lineHeight: 1.2,
    background: "#1C1C1C"
  })

const Button = ({ color = "#FFFFFF", children, href, ...rest }) =>
  href ? (
    <a {...rest} href={href} className={buttonStyle(color)}>
      {children.toUpperCase()}
    </a>
  ) : (
    <button {...rest} className={buttonStyle(color)}>
      {children.toUpperCase()}
    </button>
  )

export default Button
