import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import Header from "../components/header"
import Home from "../screens/home"
import Game from "../screens/game"
import Connect from "../screens/connect"
import { StateConsumer } from "../context/state"

const AuthExample = () => (
  <StateConsumer>
    {({ loggedIn, logIn, logOut }) => (
      <Router>
        <React.Fragment>
          <Header>
            <Link to="/">Home</Link>
          </Header>
          <PublicRoute path="/connect" component={Connect} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/play" component={Game} />
        </React.Fragment>
      </Router>
    )}
  </StateConsumer>
)

const PublicRoute = ({ component: Component, otherProps, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} {...otherProps} />} />
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <StateConsumer>
    {({ loggedIn }) => (
      <Route
        {...rest}
        render={props =>
          loggedIn === undefined ? null : loggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/connect",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )}
  </StateConsumer>
)

export default AuthExample
