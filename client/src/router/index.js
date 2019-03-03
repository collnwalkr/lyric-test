import React from "react"
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import TopLoader from "../components/top-loader"
import Home from "../screens/home"
import Game from "../screens/game"
import { StateConsumer } from "../context/state"

const Router = () => (
  <StateConsumer>
    {({ loggedIn, logIn, logOut, loading }) => (
      <BrowserRouter>
        <React.Fragment>
          {loading && <TopLoader />}
          <PublicRoute exact path="/" component={Home} />
          <PrivateRoute path="/play" component={Game} />
        </React.Fragment>
      </BrowserRouter>
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

export default Router
