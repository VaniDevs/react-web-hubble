import React from "react";
import ReactMapboxGl, {GeoJSONLayer, ScaleControl, ZoomControl} from "react-mapbox-gl";

export default class Map extends React.Component {

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


          <GeoJSONLayer
            data={this.props.data}
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