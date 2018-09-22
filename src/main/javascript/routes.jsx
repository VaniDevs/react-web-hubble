import React from 'react';
import {Route} from "react-router-dom";
import withBackground from "./components/higherOrder/withBackground";
import Dashboard from "./components/presentational/dashboard";

export default function Routes() {

  const dashboard = () => withBackground(Dashboard);

  return <div className="app-container">
    <Route exact path="/" component={dashboard}/>
  </div>;
}