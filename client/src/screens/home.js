import React from "react"
import { Link } from "react-router-dom"
import { StateConsumer } from "../context/state"
import Button from "../components/button"
import { css } from "emotion"

const logoutURL =
  process.env.NODE_ENV === "production"
    ? "/api/logout"
    : "http://localhost:3030/api/logout"

const wrapperStyle = css({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center"
})

const profileImageStyle = css({
  height: 200,
  width: 200,
  borderRadius: "50%",
  marginBottom: 100
})

const Home = () => (
  <StateConsumer>
    {({ user }) => (
      <div className={wrapperStyle}>
        <img className={profileImageStyle} src={user.photo} alt="" />
        <Link to="/play">
          <Button color="#1DB954">Continue Game</Button>
        </Link>
        <Button href={logoutURL} color="red">
          Logout
        </Button>
      </div>
    )}
  </StateConsumer>
)

export default Home
