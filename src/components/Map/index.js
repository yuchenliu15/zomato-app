import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { LocationOn} from '@material-ui/icons';

class Map extends Component {
  render() {
    console.log(process.env.REACT_APP_GOOGLE_API)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API }}
          center={{
            
              lat: this.props.current.latitude,
              lng: this.props.current.longitude
            
          }}
          defaultZoom={11}
        >
          <LocationOn
            lat={this.props.current.latitude}
            lng={this.props.current.longitude}
            color="secondary"
          />
          {
            this.props.joints.map(joint => {
              const location = joint.restaurant.location;
              console.log(parseFloat(location.latitude))
              return (
                <div
                  lat={parseFloat(location.latitude)}
                  lng={parseFloat(location.longitude)}
                >
                <LocationOn

                  color="action"
                />
                {joint.restaurant.name}
                </div>

              )
            })
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;