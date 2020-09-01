import React from "react";
import Header from "./Component/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Component/Home";
import AddEmail from "./Component/AddEmail";
import Footer from "./Component/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/add-email">
            <AddEmail />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
