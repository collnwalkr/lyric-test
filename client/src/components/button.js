import React from "react"
import { cx, css } from "emotion"
import { mq } from "../styles/"

const buttonStyle = (color, disabled) =>
  css(
    mq({
      color,
      opacity: disabled ? 0.3 : 1,
      border: `5px solid ${color}`,
      display: "inline-block",
      fontFamily: "Helvetica Neue",
      fontSize: [20, 28],
      padding: [`8px 12px`, `16px 20px`],
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
      background: "#191919",
      transition:
        "border 150ms ease, color 150ms ease, background 150ms ease, box-shadow 150ms ease",
      "&: hover": {
        background: "#131313",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)"
      }
    })
  )

const Button = ({
  color = "#FFFFFF",
  children,
  disabled,
  onClick,
  className,
  href,
  ...rest
}) =>
  href ? (
    <a
      {...rest}
      href={href}
      className={cx(buttonStyle(color, disabled), className)}
    >
      {children.toUpperCase()}
    </a>
  ) : (
    <button
      {...rest}
      onClick={() => (disabled || !onClick ? null : onClick())}
      className={cx(buttonStyle(color, disabled), className)}
    >
      {children.toUpperCase()}
    </button>
  )

export default Button
