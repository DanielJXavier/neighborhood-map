import React, { Component } from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'
import Place from './Place'

class Map extends Component {

  state = {
    places: [
      {
        name: 'Rancho Da Picanha',
        lat: -22.862641,
        lng: -46.035619,
        venue_id: '4c1538f87f7f2d7f2d22e268'
      },
      {
        name: 'Mon\'t Burger',
        lat: -22.865489,
        lng: -46.043515,
        venue_id: '5765a473cd101651ce923df1'
      },
      {
        name: 'Alpminas',
        lat: -22.862641,
        lng: -46.036485,
        venue_id: '540a56ed498e9f07ab843bee'
      },
      {
        name: 'Villa Amarela',
        lat: -22.864995,
        lng: -46.043343,
        venue_id: '4cfba4f57945224bba2587e7'
      },
      {
        name: 'Casa da Pizza',
        lat: -22.857085,
        lng: -46.026858,
        venue_id: '4e3091f3ae60601d2d40203d'
      }
    ]
  }
  
  render() {
    const MonteVerdeMap = withGoogleMap(props => (
      <GoogleMap defaultCenter={{ lat: -22.8632259, lng: -46.0392505 }} defaultZoom={ 15 }>
        {this.state.places.map((place, key) =>
          <Place key={key} lat={place.lat} lng={place.lng} name={place.name} />
        )}
      </GoogleMap>

    ))

    return (
      <MonteVerdeMap containerElement={<div style={{ width: '100vw', height: '100vh' }} />} mapElement={<div style={{ height: '100%' }} />} />
    )
  }
}

export default Map
