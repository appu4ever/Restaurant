import React, { Component } from 'react';
import './App.css';
import Information from './Information'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import  Explore  from './Explore'
import Map from './Map'
class App extends Component {

  state = {
    index: '0',
    locationDetails: [],
    googleMaps: {}
  }

  componentDidMount() {
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyC-VuWTUAwzuavTs7nfiC_OkO8M0Yci5to&v=3&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {

    let styles= [
        {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "weight": "2.00"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#9c9c9c"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#7b7b7b"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#46bcec"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c8d7d4"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#070707"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        }
    ]

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 9,
      styles: styles,
      mapTypeControl: false
    })

    this.setState({googleMaps: map})
    var infoWindow = new window.google.maps.InfoWindow()
    var bounds = new window.google.maps.LatLngBounds()
    var service = new window.google.maps.places.PlacesService(map)

    var icon = {
        url: 'http://www.myiconfinder.com/uploads/iconsets/24-24-6096188ce806c80cf30dca727fe7c237.png', // url
        size: new window.google.maps.Size(24, 24),
        origin: new window.google.maps.Point(0,0), // origin
        anchor: new window.google.maps.Point(0, 0) // anchor
    }

    var request = [
      {query: 'The Spotted Pig New York'},
      {query: 'The Loeb Boathouse New York'},
      {query: 'Robertas New York'}
    ];


    request.map(loc => {
      this.getDetails(loc, service, map, bounds, icon)
    })
  }

  getDetails = (loc, service, map, bounds, icon) => {
    let locationDetails = []
    service.textSearch(loc,(results, status) => {
       if (status === window.google.maps.places.PlacesServiceStatus.OK) {

         var marker = new window.google.maps.Marker({
             place: {
              placeId: results[0].place_id,
              location: results[0].geometry.location
             },
             map: map,
             icon: icon,
             optimized: false,
             animation: window.google.maps.Animation.DROP
           })

         bounds.extend(marker.place.location)
         map.fitBounds(bounds)

         let info= {}

          service.getDetails({
              placeId: results[0].place_id
            }, (result,status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                // console.log(result)
                info.title= loc.query
                info.latLng= [results[0].geometry.location.lat(),results[0].geometry.location.lng()]
                info.marker= marker
                info.placeId= results[0].place_id
                info.address= result.formatted_address
                info.phone= result.formatted_phone_number
                info.website= result.website
                info.hours= result.opening_hours.weekday_text
                info.photos= result.photos
                info.reviews= result.reviews
                info.image= result.photos[0].getUrl()
                locationDetails.push(info)
                this.setState(prevState => {
                  return {locationDetails: prevState.locationDetails.concat(locationDetails)}
                })
              }
            }
          )
        }
      })
  }

  render() {
    return (
      <div className= "map-container">
        <div className= "map-heading">Restaurant Information</div>
        <div id= "map"></div>
        <Route path= "/" exact render = {() => (
          <Map locationDetails= {this.state.locationDetails} index= {this.state.index} googleMaps= {this.state.googleMaps}/>
        )}/>
        <Route path= "/explore" render = {() => (
            <Explore locationDetails= {this.state.locationDetails[`${this.state.index}`]}/>
        )}/>

      </div>
    );
  }
}

function loadScript(url) {
  var index= window.document.getElementsByTagName('script')[0]
  var script = window.document.createElement('script')
  script.src = url
  script.defer = true
  script.async = true
  index.parentNode.insertBefore(script,index)
}

export default App;
