import React from "react";
import ReactMapboxGl, {GeoJSONLayer, ScaleControl, ZoomControl, Popup} from "react-mapbox-gl";
import * as _ from "lodash";

export default class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPopupVisible: false,
      coordinates: [0, 0],
    };

    this.onCircleClick = this.onCircleClick.bind(this);
    this.onPopupClick = this.onPopupClick.bind(this);
  }

  onCircleClick(event) {
    const found = _.filter(this.props.data['features'], o =>
      Number.parseFloat(o['geometry']['coordinates'][0]).toFixed(2) === Number.parseFloat(event['lngLat']['lng']).toFixed(2) &&
      Number.parseFloat(o['geometry']['coordinates'][1]).toFixed(2) === Number.parseFloat(event['lngLat']['lat']).toFixed(2))[0];

    if (found) {
      this.setState({
        isPopupVisible: true,
        coordinates: found['geometry']['coordinates'],
      })
    }
  }

  onPopupClick() {
    this.setState({
      isPopupVisible: false,
      coordinates: ['0,0'],
    })
  }

  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiZWNlemFscCIsImEiOiJjamx0cGFrYmQwZDNvM3BwZXdjb25vd2dhIn0.lGBGP9iwGbRSJ5oduZwZcw"
    });

    const symbolLayout = {
      'text-field': '{name}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-offset': [0, 0.3],
      'text-anchor': 'top'
    };

    const symbolPaint = {
      'text-color': '#265A8D'
    };

    const circleLayout = {visibility: 'visible'};

    const circlePointFatalities = {
      'circle-color': 'indianred'
    };

    return <div className="map-container">
      <div id="text-map">
        <Map
          center={[-123.1204278, 49.280925]}
          style="mapbox://styles/mapbox/streets-v9"
          pitch={[5]}
          zoom={[11]}
          onDragEnd={(drag, e) => console.log("enddrag", drag, "e", e)}

          containerStyle={{
            width: "100%",
            height: "100vh",
          }}>
          <ScaleControl/>
          <ZoomControl/>

          {this.state.isPopupVisible &&
          <Popup
            onClick={this.onPopupClick}
          coordinates={this.state.coordinates}
          offset={{'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]}}>
            <h1>FOUND</h1>
          </Popup>}


          <GeoJSONLayer
            data={this.props.data}
            circleLayout={circleLayout}
            circlePaint={circlePointFatalities}
            circleOnClick={this.onCircleClick}
            symbolLayout={symbolLayout}
            symbolPaint={symbolPaint}
          />
        </Map>
      </div>
    </div>;
  }
}