import React from 'react';
import Map from "./map";
import Sidebar from "./sidebar";

export default function Dashboard() {
  return <div className="dashboard">
    <Sidebar/>
    <Map/>
  </div>;
}