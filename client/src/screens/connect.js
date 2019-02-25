import React from "react"
import { css } from "emotion"
import Button from "../components/button"

const connectURL =
  process.env.NODE_ENV === "production"
    ? "http://my-app.com/login"
    : "http://localhost:3030/login"

const headerStyle = css({
  fontSize: 100
})

const wrapperStyle = css({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center"
})

const Connect = () => (
  <div className={wrapperStyle}>
    <h1 className={headerStyle}>🎧</h1>
    <Button href={connectURL} color="#1DB954">
      Connect Spotify
    </Button>
  </div>
)

export default Connect
