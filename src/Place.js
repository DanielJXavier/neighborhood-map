import React, { Component } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'

class Place extends Component {

  state = {
    info: false
  }

  toggleInfo = (index) => {
    this.setState((state) => ({
      info: !state.info
    }))
  }

  render() {
    const { lat, lng, name } = this.props

    return (
      <Marker position={{ lat: lat, lng: lng }} onClick={() => this.toggleInfo()}>
        {this.state.info && <InfoWindow onCloseClick={() => this.toggleInfo()}>
          <div>
            <h3>{name}</h3>
          </div>
        </InfoWindow>}
      </Marker>
    )
  }
}

export default Place
