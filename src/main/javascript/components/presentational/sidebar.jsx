import React, {Component, Fragment} from 'react';
import {SEED_DATA} from '../constants/seedData'

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openCommentId: "",
    };

    this.renderViolationComments = this.renderViolationComments.bind(this);
    this.violationMapper = this.violationMapper.bind(this);
  }

  getViolations() {
    return SEED_DATA['features'].map((element, index) => ({
      locationName: element['properties']['name'],
      date: `${Math.floor(Math.random() * 12 + 1)}/${Math.floor(Math.random() * 31 + 1)}/201${Math.floor(Math.random() * 8 + 1)}`,
      key: `violation-${index}`,
      comments: "long long long long long long long long, long long long long long long long long, long long long long long long long long, long long long long long long long long, long long long long long long long long, long long long long long long long long, long long long long long long long long, long long long long long long long long, long long long long long long long long",
    }));
  }

  getViolationTitle() {
    return <div className="violation-title">
      <i className="fas fa-exclamation-triangle"/>
      <div className="text">MISUSE CASE</div>
    </div>;
  }

  getViolationDetails(violation) {
    return <div className="violation-details">
      <div className="name">{violation['locationName']}</div>
      <div className="date"><i className="far fa-calendar-alt"/>{violation['date']}</div>
      {this.renderViolationComments(violation)}
    </div>;
  }

  renderViolationComments({key, comments}) {
    if (comments.length > 0) {
      const isLongComment = this.state.openCommentId === key;

      return <div className="comments">
        {isLongComment ? comments : comments.slice(0, 50) + "..."}
        <i className={`fas fa-chevron-${isLongComment ? "up" : "down"}`}
           onClick={() => this.setState({openCommentId: isLongComment ? "" : key})}/>
      </div>;
    }
  }

  violationMapper(violation) {
    return <div className="violation-container paper" key={violation['key']}>
      {this.getViolationTitle()}
      {this.getViolationDetails(violation)}
    </div>;
  }

  getHeader() {
    return <div className="header">
      <div className="logo"/>
      <div className="title-text">OCEAN WISE <br/> MISUSED LABELS</div>
    </div>;
  }

  render() {
    return <div className="sidebar">
      {this.getHeader()}
      <div className="violations">
        {this.getViolations().map(this.violationMapper)}
      </div>
    </div>;
  }
}