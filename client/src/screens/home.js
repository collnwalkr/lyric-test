import React from "react"
import { Link } from "react-router-dom"
import { StateConsumer } from "../context/state"
import Button from "../components/button"
import { css } from "emotion"

const logoutURL =
  process.env.NODE_ENV === "production"
    ? "/api/logout"
    : "http://localhost:3030/api/logout"

const loginURL =
  process.env.NODE_ENV === "production"
    ? "/api/login"
    : "http://localhost:3030/api/login"

const headerStyle = css({
  marginBottom: 50,
  fontSize: 100
})

const loggedInUserStyle = css({
  marginBottom: 50,
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
})

const logOutLinkStyle = css({
  cursor: "pointer",
  fontSize: 14,
  marginTop: 15,
  textDecoration: "underline",
  color: "#7aafff",
  "&: hover": {
    color: "#96c0ff"
  }
})

const buttonStyle = css({
  width: "100%",
  marginTop: 10
})

const wrapperStyle = css({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center"
})

const buttonsWrapper = css({
  display: "flex",
  flexDirection: "column"
})

const profileImageStyle = css({
  height: 200,
  width: 200,
  borderRadius: "50%"
})

const Home = ({ history }) => (
  <StateConsumer>
    {({ user, loggedIn, logOut, gameOver, resetGame, loading }) =>
      loggedIn === undefined ? null : loggedIn ? (
        <div className={wrapperStyle}>
          <div className={loggedInUserStyle}>
            <img className={profileImageStyle} src={user.photo} alt="" />
            <a
              onClick={async () => {
                await logOut()
                window.location.href = logoutURL
              }}
              className={logOutLinkStyle}
            >
              {`Not ${user.displayName}? Log out.`}
            </a>
          </div>
          <div className={buttonsWrapper}>
            <Link to="/play">
              {!gameOver && (
                <Button
                  className={buttonStyle}
                  disabled={loading}
                  color="#1DB954"
                >
                  Continue game
                </Button>
              )}
            </Link>
            <Button
              disabled={loading}
              className={buttonStyle}
              color="#ef34b1"
              onClick={async () => {
                await resetGame()
                history.push("/play")
              }}
            >
              Start new game
            </Button>
          </div>
        </div>
      ) : (
        <div className={wrapperStyle}>
          <h1 className={headerStyle}>🎧</h1>
          <Button href={loginURL} color="#1DB954">
            Connect Spotify
          </Button>
        </div>
      )
    }
  </StateConsumer>
)

export default Home
