import React, {Component, createRef, Fragment} from 'react';
import * as dateFns from 'date-fns';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openCommentId: "",
      isUpdating: false,
    };

    this.violationRef = createRef();
    this.renderViolationComments = this.renderViolationComments.bind(this);
    this.violationMapper = this.violationMapper.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  getViolationTitle() {
    return <div className="violation-title">
      <i className="fas fa-exclamation-triangle"/>
      <div className="text">MISUSE CASE</div>
    </div>;
  }

  getViolationDetails(violation) {
    return <div className="violation-details">
      <div className="top-container">
        <div className="text-container">
          {this.getViolationTitle()}
          <div className="name">{violation['locationName']}</div>
          <div className="date"><i
            className="far fa-calendar-alt"/>{dateFns.format(violation['date'], 'MMMM DD, YYYY HH:mm')}</div>
        </div>
        <div>
          <img className="location-img" src={violation['url']}/>
        </div>
      </div>
      {this.renderViolationComments(violation)}
    </div>;
  }

  renderViolationComments({key, comments}) {
    if (comments.length > 0) {
      const isLongComment = this.state.openCommentId === key;

      return <div className="comments">
        {isLongComment ? comments : comments.slice(0, 47) + "..."}
        <i className={`fas fa-chevron-${isLongComment ? "up" : "down"}`}
           onClick={() => this.setState({openCommentId: isLongComment ? "" : key})}/>
      </div>;
    }
  }

  violationMapper(violation) {
    return <div className="violation-container paper" key={violation['key']}>
      {this.getViolationDetails(violation)}
    </div>;
  }

  getHeader() {
    return <div className="header">
      <div className="logo"/>
      <div className="title-text">OCEAN WISE <br/> MISUSED LABELS</div>
    </div>;
  }

  onScroll() {
    const scrollee = this.violationRef.current;

    if (!this.state.isUpdating &&
      scrollee.scrollTop + scrollee.offsetHeight >= scrollee.scrollHeight - 50) {
      this.setState({isUpdating: true});
      this.props.onScroll();
      setTimeout(() => this.setState({isUpdating: false}), 1000);
    }
  }

  render() {
    return <div className="sidebar">
      {this.getHeader()}
      <div className="violations" ref={this.violationRef} onScroll={this.onScroll}>
        {this.props.data.map(this.violationMapper)}
      </div>
    </div>;
  }
}