import React from 'react'

const LocationItem = (props) => (
  <li role="button" className="box" tabIndex="0" onKeyPress={props.openInfoWindow.bind(this, props.data.marker, props.data.venue_id)} onClick={props.openInfoWindow.bind(this, props.data.marker, props.data.venue_id)}>{props.data.name}</li>
)

export default LocationItem
