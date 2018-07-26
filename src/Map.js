import React, { Component } from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'
import Place from './Place'

class Map extends Component {

  state = {
    places: [
      {
        name: 'Rancho Da Picanha',
        address: '945, Av. Monte Verde, Camanducaia - MG, 37650-000',
        lat: -22.862641,
        lng: -46.035619
      },
      {
        name: 'Mon\'t Burger',
        address: 'Av. da Fazenda, 140 - Monte Verde, Camanducaia - MG, 37650-000',
        lat: -22.865489,
        lng: -46.043515
      },
      {
        name: 'Alpminas',
        address: 'Av. Monte Verde, 7, Camanducaia - MG, 37650-000',
        lat: -22.862641,
        lng: -46.036485
      },
      {
        name: 'Villa Amarela',
        address: 'Av. da Fazenda, 10 - Monte Verde, Camanducaia - MG, 37653-000',
        lat: -22.864995,
        lng: -46.043343
      },
      {
        name: 'Casa da Pizza',
        address: 'R. Pau Brasil, 309 - Monte Verde, Camanducaia - MG, 37650-000',
        lat: -22.857085,
        lng: -46.026858
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
