import React, { Component } from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'

class Map extends Component {

  render() {
    const MonteVerdeMap = withGoogleMap(props => (
      <GoogleMap defaultCenter={{ lat: -22.8632259, lng: -46.0392505 }} defaultZoom={ 15 } />
    ))

    return (
      <MonteVerdeMap containerElement={<div style={{ width: '100vw', height: '100vh' }} />} mapElement={<div style={{ height: '100%' }} />} />
    )
  }
}

export default Map
