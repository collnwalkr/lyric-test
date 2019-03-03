import React, { Component } from "react"
import { css } from "emotion"
import { withRouter } from "react-router"
import Button from "./button"
import { mq } from "../styles/"
import { StateConsumer } from "../context/state"

const gameOverWrapperStyle = css({
  zIndex: 1000,
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  backgroundColor: "rgba(0, 0, 0, 0.8)"
})

const gameOverOptionsStyle = css({
  padding: 10,
  color: "white",
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
})

const gameOverHeaderStyle = css(
  mq({
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: [30, 35, 40],
    display: "inline",
    color: "black",
    backgroundColor: "white",
    padding: 5,
    boxShadow: "10px 0 0 white, -10px 0px 0px white"
  })
)

const scoreStyle = css({
  marginBottom: 20,
  fontSize: 28
})

class GameOver extends Component {
  render() {
    const { history } = this.props

    return (
      <StateConsumer>
        {({ gameOver, score, resetGame, user, loading }) =>
          gameOver ? (
            <div className={gameOverWrapperStyle}>
              <div className={gameOverOptionsStyle}>
                {score.count > 0 && (
                  <React.Fragment>
                    <h1 className={gameOverHeaderStyle}>
                      Way to go {user.displayName.split(" ")[0]}!
                    </h1>
                    <p className={scoreStyle}>
                      Final score: {`${score.correct}/${score.count}`}
                    </p>
                  </React.Fragment>
                )}
                <Button
                  disabled={loading}
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
          ) : null
        }
      </StateConsumer>
    )
  }
}

export default withRouter(GameOver)
