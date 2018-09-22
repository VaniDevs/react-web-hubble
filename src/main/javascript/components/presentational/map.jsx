import React from "react";
import ReactMapboxGl, {GeoJSONLayer} from "react-mapbox-gl";
import {SEED_DATA} from "../constants/seedData";

export default class Map extends React.Component {

  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiZWNlemFscCIsImEiOiJjamx0cGFrYmQwZDNvM3BwZXdjb25vd2dhIn0.lGBGP9iwGbRSJ5oduZwZcw"
    });

    const symbolLayout = {
      'text-field': '{place}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-offset': [0, 0.6],
      'text-anchor': 'top'
    };

    const symbolPaint = {
      'text-color': 'white'
    };

    const circleLayout = {visibility: 'visible'};

    const circlePointFatalities = {
      'circle-color': 'red'
    };

    return <div className="map">
      <div id="text-map">
        <Map
          center={[-123.1204278, 49.280925]}
          style="mapbox://styles/mapbox/streets-v9"
          pitch={[5]}
          zoom={[14]}
          containerStyle={{
            width: "100%",
            height: "100vh",
          }}>

          <GeoJSONLayer
            data={SEED_DATA}
            circleLayout={circleLayout}
            circlePaint={circlePointFatalities}
            circleOnClick={() => {
            }}
            symbolLayout={symbolLayout}
            symbolPaint={symbolPaint}
          />
        </Map>
      </div>
    </div>;
  }
}