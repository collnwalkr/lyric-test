import React from "react"
import { injectGlobal } from "emotion"
import State from "./context/state"
import ColorWash from "./context/color-wash"
import Router from "./router"

injectGlobal`
  * {
    font-family: 'Helvetica' !important;
  }
  body {
    background-color: #191919;
  }
  #root {
    overflow-x: hidden;
    min-height: 100vh;
    display: flex;
  }
`

const App = () => (
  <State>
    <ColorWash>
      <Router />
    </ColorWash>
  </State>
)

export default App
