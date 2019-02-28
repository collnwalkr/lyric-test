import React from "react"
import { css } from "emotion"

const buttonStyle = (color, disabled) =>
  css({
    color,
    opacity: disabled ? 0.3 : 1,
    border: `5px solid ${color}`,
    display: "inline-block",
    fontFamily: "Helvetica Neue",
    fontSize: 28,
    padding: `16px 20px`,
    minWidth: 258,
    textAlign: "center",
    boxShadow: "0px 0px 8px rgba(0,0,0,0.2)",
    boxSizing: "border-box",
    margin: 0,
    textDecoration: "none",
    verticalAlign: "middle",
    cursor: disabled ? "inherit" : "pointer",
    borderRadius: 4,
    lineHeight: 1.2,
    background: "#1C1C1C"
  })

const Button = ({
  color = "#FFFFFF",
  children,
  disabled,
  onClick,
  href,
  ...rest
}) =>
  href ? (
    <a {...rest} href={href} className={buttonStyle(color, disabled)}>
      {children.toUpperCase()}
    </a>
  ) : (
    <button
      {...rest}
      onClick={() => (disabled || !onClick ? null : onClick())}
      className={buttonStyle(color, disabled)}
    >
      {children.toUpperCase()}
    </button>
  )

export default Button
