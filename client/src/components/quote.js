import React, { Component } from "react"
import { css } from "emotion"
import { StateConsumer } from "../context/state"

const quoteWrapperStyle = css({
  fontSize: 20,
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
  marginBottom: 30
})

const quoteLineStyle = css({
  display: "inline",
  backgroundColor: "white",
  boxShadow: "4px 0 0 white, -4px 0px 0px white"
})

class Quote extends Component {
  render() {
    return (
      <StateConsumer>
        {({ currentQuote, correctSong }) => (
          <div className={quoteWrapperStyle}>
            <p className={quoteLineStyle}>{correctSong.title}</p>
            {currentQuote.map((line, index) => (
              <div key={index} style={{ paddingLeft: 4, paddingRight: 4 }}>
                <p className={quoteLineStyle}>{line}</p>
              </div>
            ))}
          </div>
        )}
      </StateConsumer>
    )
  }
}

export default Quote
