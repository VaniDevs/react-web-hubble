import React, {Fragment} from 'react';
import {SEED_DATA, LOREM_IPSUM} from '../constants/seedData'
import * as _ from 'lodash';

export default function Sidebar() {

  const loremIpsum = LOREM_IPSUM.split(" ");

  const getComments = () => {
    return (Math.random() > 0.7) && `"${_.sampleSize(loremIpsum, Math.floor(Math.random()*50+1)).join(" ")}"`;
  };

  const violations = SEED_DATA['features'].map((element, index) => ({
    restaurantName: element['properties']['name'],
    date: `${Math.floor(Math.random()*12+1)}/${Math.floor(Math.random()*31+1)}/201${Math.floor(Math.random()*8+1)}`,
    key: `violation-${index}`,
    comments: getComments(),
  }));

  const violationTitle =
    <div className="violation-title">
      <i className="fas fa-exclamation-triangle"/>
      <div className="text">Ocean Wise Label Violation!</div>
    </div>;

  const getViolationDetails = (violation) =>
    <div className="violation-details">
      <div className="name">{violation['restaurantName']}</div>
      <div>{violation['date']}</div>
      <div className="comments">{violation['comments']}</div>
    </div>;

  const violationMapper = (violation) =>
    <div className="violation-container paper" key={violation['key']}>
      {violationTitle}
      {getViolationDetails(violation)}
    </div>;

  return <div className="sidebar">
    {violations.map(violationMapper)}
  </div>
}