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
    };

    this.onSidebarScroll = this.onSidebarScroll.bind(this);
  }

  componentDidMount() {
    axios.get("https://vanhacks-hubble.herokuapp.com/events?offset=21&limit=25")
      .then(({data}) => this.setState({
        mapData: this.parseMapData(data),
        sidebarData: this.parseSidebarData(data),
      }));
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

  onSidebarScroll() {
    axios.get(`https://vanhacks-hubble.herokuapp.com/events?offset=${Math.floor(Math.random()*20+1)}&limit=25`)
      .then(({data}) => this.setState({
        mapData: this.parseMapData(data),
        sidebarData: [...this.state.sidebarData, ...this.parseSidebarData(data)],
      }));
  }

  render() {
    return <div className="dashboard">
      <Sidebar data={this.state.sidebarData} onScroll={this.onSidebarScroll}/>
      <Map data={this.state.mapData}/>
    </div>;
  }
}