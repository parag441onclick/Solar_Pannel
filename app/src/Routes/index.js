import React from "react";

import { Route, Switch } from "react-router-dom";

import history from "../history";

import Main from "../components/Main";
import Survey from "../components/Survey";
import Result from "../components/Survey/components/Result";

class Routes extends React.Component {
  render() {
    return (
      <div className='main text-center'>
        <Route path='/' exact component={Main} />
        <Route path='/survey/question/:id' exact component={Survey} />
        <Route path='/result' exact component={Result} />
      </div>
    );
  }
}

export default Routes;
