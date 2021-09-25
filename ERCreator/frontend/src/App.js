import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { getAccessToken } from "./localStorage";
import { setToken as apiSetToken } from "./api/instance";

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        getAccessToken() ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

const App = () => {
  const accessToken = getAccessToken();
  if (accessToken) apiSetToken(accessToken);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/">
          <HomePage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default App;
