import React, {Component} from 'react'
import Locations from './Locations'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [
        {
          name: `Rancho Da Picanha`,
          lat: -22.862641,
          lng: -46.035619,
          venue_id: `4c1538f87f7f2d7f2d22e268`
        },
        {
          name: `Mon't Burger`,
          lat: -22.865489,
          lng: -46.043515,
          venue_id: `5765a473cd101651ce923df1`
        },
        {
          name: `Alpminas`,
          lat: -22.862641,
          lng: -46.036485,
          venue_id: `540a56ed498e9f07ab843bee`
        },
        {
          name: `Villa Amarela`,
          lat: -22.864995,
          lng: -46.043343,
          venue_id: `4cfba4f57945224bba2587e7`
        },
        {
          name: `Casa da Pizza`,
          lat: -22.857085,
          lng: -46.026858,
          venue_id: `4e3091f3ae60601d2d40203d`
        }
      ],
      map: ``,
      infowindow: ``,
      marker: ``
    }

    this.initMap = this.initMap.bind(this)
    this.openInfoWindow = this.openInfoWindow.bind(this)
    this.closeInfoWindow = this.closeInfoWindow.bind(this)
  }

  componentDidMount() {
    window.initMap = this.initMap
    loadMapJS(`https://maps.googleapis.com/maps/api/js?key=AIzaSyBm8eT1_bYvNdviQ4ijkbZNPGuvAKoS_R4&callback=initMap`)
  }

  initMap() {
    const self = this

    const mapview = document.getElementById(`map`)
    mapview.style.height = `${window.innerHeight}px`
    const map = new window.google.maps.Map(mapview, {
      center: {lat: -22.8632259, lng: -46.0392505},
      zoom: 15,
      mapTypeControl: false
    })

    const InfoWindow = new window.google.maps.InfoWindow({})

    window.google.maps.event.addListener(InfoWindow, `closeclick`, () => { self.closeInfoWindow() })

    this.setState({
      map,
      infowindow: InfoWindow
    })

    window.google.maps.event.addDomListener(window, `resize`, () => {
      const center = map.getCenter()
      window.google.maps.event.trigger(map, `resize`)
      self.state.map.setCenter(center)
    })

    window.google.maps.event.addListener(map, `click`, () => { self.closeInfoWindow() })

    const locations = []
    this.state.locations.forEach(location => {
      const marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(location.lat, location.lng),
        animation: window.google.maps.Animation.DROP,
        map
      })

      marker.addListener(`click`, () => { self.openInfoWindow(marker, location.venue_id) })

      location.marker = marker
      location.display = true
      locations.push(location)
    })
    this.setState({ locations })
  }

  openInfoWindow(marker, venue_id) {
    this.closeInfoWindow()
    this.getMarkerInfo(venue_id)
    this.state.infowindow.open(this.state.map, marker)
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
    this.setState({ marker })
    this.state.infowindow.setContent(`Buscando informações...`)
    this.state.map.setCenter(marker.getPosition())
    this.state.map.panBy(0, -200)
  }

  getMarkerInfo(venue_id) {
    const self = this
    const clientId = `M0JMIYHMGRQZGYY112XB1DNLMTGNNQ3OERSQVT2RGATCWGNK`
    const clientSecret = `EMFDQHQJK14HC0W241KMHHUAMGHG0FU3MNTW3PMCWBRMOBWH`
    const url = `https://api.foursquare.com/v2/venues/${venue_id}?client_id=${clientId}&client_secret=${clientSecret}&v=20180323&limit=1`

    fetch(url)
    .then(response => {
      if (response.status !== 200) {
        self.state.infowindow.setContent(`Impossível buscar informações no Foursquare!`)
        return
      }

      response.json().then(data => {
        console.log(data.response.venue)
        const venue = data.response.venue
        self.state.infowindow.setContent(`
          <h3>${venue.name} (${venue.categories[0].name})</h3>
          ${venue.rating && `<p>Nota: ${venue.rating} (${venue.ratingSignals} votos)</p>`}
          <p>Preço: ${venue.price.message}</p>
          <a href="${venue.shortUrl}">Ver mais</a>
        `)
      })
    }
  )
  .catch(err => {
    self.state.infowindow.setContent(`Impossível buscar informações no Foursquare!`)
  })
}

closeInfoWindow() {
  if (this.state.marker) {
    this.state.marker.setAnimation(null)
  }
  this.setState({ marker: `` })
  this.state.infowindow.close()
}

render() {
  return (
    <div>
      <Locations key="100" locations={this.state.locations} openInfoWindow={this.openInfoWindow}
        closeInfoWindow={this.closeInfoWindow}/>
      <div id="map"></div>
    </div>
  )
}
}

export default App

const loadMapJS = src => {
  const ref = window.document.getElementsByTagName(`script`)[0]
  const script = window.document.createElement(`script`)
  script.src = src
  script.async = true
  script.onerror = () => { document.write(`Impossível carregar o Google Maps`) }
  ref.parentNode.insertBefore(script, ref)
}
