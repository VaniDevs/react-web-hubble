import React from 'react';
import Map from "./map";
import Sidebar from "./sidebar";
import axios from 'axios';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mapData: {},
      sidebarData: [],
      offset: -1,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const newOffset = this.state.offset + 1;
    axios.get(`https://vanhacks-hubble.herokuapp.com/events?offset=${newOffset}&limit=6`)
      .then(({data}) => this.setState({
          mapData: this.parseMapData(data),
          sidebarData: [...this.state.sidebarData, ...this.parseSidebarData(data)],
          offset: newOffset,
        })
      );
  }

  parseMapData(data) {
    return {
      "type": "FeatureCollection",
      "features": data.map(item => ({
        "type": "Feature",
        "geometry": item["location"]["geometry"],
        "properties": {
          "name": item["location"]["properties"]["name"],
        }
      })),
    };
  }

  parseSidebarData(data) {
    return data.map((item) => ({
      locationName: item['location']['properties']['name'],
      date: new Date(item["created"] * 1000).toString(),
      key: Math.random(),
      comments: item["comments"],
      url: item["image_url"],
    }))
  }

  render() {
    return <div className="dashboard">
      <Sidebar data={this.state.sidebarData} onScroll={this.fetchData}/>
      <Map data={this.state.mapData}/>
    </div>;
  }
}