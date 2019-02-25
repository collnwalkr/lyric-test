import React from "react"
import { injectGlobal } from "emotion"
import State from "./context/state"
import Router from "./router"

injectGlobal`
  * {
    font-family: 'Helvetica' !important;
  }
  body {
    background-color: #242424;
  }
  #root {
    min-height: 100vh;
    display: flex;
  }
`

const App = () => (
  <State>
    <Router />
  </State>
)

export default App
