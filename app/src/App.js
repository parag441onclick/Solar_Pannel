import React from "react";

import { Router } from "react-router-dom";

import Routes from "./Routes";
import history from "./history";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./styles.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Header />
          <Routes />
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
