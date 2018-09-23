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
    }
  }

  componentDidMount() {
    axios.get("https://vanhacks-hubble.herokuapp.com/events?offset=1&limit=25",
      {headers: {"Access-Control-Allow-Origin": "*"}})
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
      key: item["id"],
      comments: item["comments"],
      url: item["image_url"],
    }))
  }

  render() {
    return <div className="dashboard">
      <Sidebar data={this.state.sidebarData}/>
      <Map data={this.state.mapData}/>
    </div>;
  }
}