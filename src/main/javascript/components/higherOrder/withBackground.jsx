import React from 'react';

export default function withBackground(Wrapped) {

  const topNav = <div className="top-nav">
    this is top nav
  </div>;

  const body = <div className="body-container" style={{backgroundColor: "aliceblue"}}>
    <Wrapped/>
  </div>;

  const bottomNav = <div className="bottom-nav">
    This is bottom nav
  </div>;

  return <div className="background-container">
    {topNav}
    {body}
    {bottomNav}
  </div>
}