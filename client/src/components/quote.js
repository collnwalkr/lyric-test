import React, { Component } from "react"
import { css } from "emotion"
import { mq } from "../styles/"
import { StateConsumer } from "../context/state"

const MAX_LENGTH = 100

const quoteWrapperStyle = css(
  mq({
    fontSize: [20, 30, 35],
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
    marginBottom: 30
  })
)

const quoteLineStyle = css({
  display: "inline",
  backgroundColor: "white",
  boxShadow: "4px 0 0 white, -4px 0px 0px white"
})

class Quote extends Component {
  render() {
    return (
      <StateConsumer>
        {({ quote, correctSong }) => (
          <div className={quoteWrapperStyle}>
            {quote.map((line, index) => {
              const displayLine =
                line && line.length > MAX_LENGTH
                  ? `${line.substr(0, MAX_LENGTH)}...`
                  : line
              return (
                <div key={index} style={{ paddingLeft: 4, paddingRight: 4 }}>
                  <p className={quoteLineStyle}>{displayLine}</p>
                </div>
              )
            })}
          </div>
        )}
      </StateConsumer>
    )
  }
}

export default Quote
