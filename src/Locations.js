import React, {Component} from 'react'
import LocationItem from './LocationItem'

class Locations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      query: ``,
      suggestions: true
    }

    this.filterLocations = this.filterLocations.bind(this)
    this.toggleSuggestions = this.toggleSuggestions.bind(this)
  }

  filterLocations(event) {
    this.props.closeInfoWindow()
    const {value} = event.target
    const locations = []
    this.props.locations.forEach(function (location) {
      if (location.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        location.marker.setVisible(true)
        locations.push(location)
      } else {
        location.marker.setVisible(false)
      }
    })

    this.setState({
      locations,
      query: value
    })
  }

  componentWillMount() {
    this.setState({ locations: this.props.locations })
  }

  toggleSuggestions() {
    this.setState({ suggestions: !this.state.suggestions })
  }

  render() {
    const Locations = this.state.locations.map(function (listItem, index) {
      return (
        <LocationItem key={index} openInfoWindow={this.props.openInfoWindow.bind(this)} data={listItem}/>
      )
    }, this)

    return (
      <div className="search">
        <input role="search" aria-label="search input" id="search-field" className="search-field" type="text" placeholder="Filtro" value={this.state.query} onChange={this.filterLocations}/>
        <ul>
          {this.state.suggestions && Locations}
        </ul>
      </div>
    )
  }
}

export default Locations
