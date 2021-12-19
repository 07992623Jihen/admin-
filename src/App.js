import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink,
  MDBTooltip,
  MDBIcon,
} from "mdbreact";
import { ReactComponent as Logo } from "./assets/logo.svg";
import Routes from "./Routes";
import { Route, BrowserRouter } from "react-router-dom";
import { UserAuth } from "./hooks/auth";
import { Authcontext } from "./context/auth-context";
import Login from "./views/login";
import NavBar from "./components/nav-bar";
import ChartsPage from "./views/chart";
import ListClient from "./views/agriculteur/list";
import ListIngenieure from "./views/ingenieur/list";
import AjoutIngenieure from "./views/ingenieur/ajout";
import UpdateIngenieure from "./views/ingenieur/update";
import BloqueIngenieure from "./views/ingenieur/bloque";



function App() {
  const { userId, token, login, logout, user } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        
        <Route exact  path="/" component={ListClient} />
        <Route  path="/ingenieure" component={ListIngenieure} />
        <Route  path="/ajout-ingenieure" component={AjoutIngenieure} />
        <Route  path="/update-ingenieure/:id" component={UpdateIngenieure} />
        <Route  path="/bloque-ingenieure/:id" component={BloqueIngenieure} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route exact path="/" component={Login} />
      </React.Fragment>
    );
  }

  return (
    <Authcontext.Provider
      value={{
        userId: userId,
        token: token,
        login: login,
        logout: logout,
        user: user,
      }}
    >
      <BrowserRouter>
        {!token ? <Login /> : <NavBar content={routes} />}
      </BrowserRouter>
    </Authcontext.Provider>
  );
}

export default App;
