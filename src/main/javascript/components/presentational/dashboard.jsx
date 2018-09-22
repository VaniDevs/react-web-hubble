import React from 'react';
import Map from "./map";

export default function Dashboard() {
  return <div className="dashboard">
    <div className="sidebar">
      <h1>SIDEBAR</h1>
    </div>
    <Map/>
  </div>;
}