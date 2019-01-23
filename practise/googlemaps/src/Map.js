import React, { Component } from 'react';
import './App.css';
import Information from './Information'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import  Explore  from './Explore'

class Map extends Component {
  state = {
    index: '0'
  }

  componentDidMount() {
    this.setState({index: this.props.index})
  }

    previousSlider = () => {
      if (this.state.index === '0') {
        this.setState({index: this.props.locationDetails.length.toString() - 1},function() {
            this.props.locationDetails.map(loc => (
              loc.marker.setMap(null)
            ))
            this.props.locationDetails[`${this.state.index}`].marker.setMap(this.props.googleMaps)
          }
        )
      } else {
        this.setState(prevState => {
          return {index: (parseInt(prevState.index) - 1).toString()}
        },function() {
            this.props.locationDetails.map(loc => (
              loc.marker.setMap(null)
            ))
            this.props.locationDetails[`${this.state.index}`].marker.setMap(this.props.googleMaps)
          }
        )
      }
    }

    nextSlider = () => {
      if (parseInt(this.state.index) + 1 === this.props.locationDetails.length) {
        this.setState({index: '0'}, function() {
          this.props.locationDetails.map(loc => (
            loc.marker.setMap(null)
          ))
          this.props.locationDetails[`${this.state.index}`].marker.setMap(this.props.googleMaps)
        })
      } else {
        this.setState(prevState => {
          return {index: (parseInt(prevState.index) + 1).toString()}
        }, function() {
          this.props.locationDetails.map(loc => (
            loc.marker.setMap(null)
          ))
          this.props.locationDetails[`${this.state.index}`].marker.setMap(this.props.googleMaps)
        })
      }
    }
  render() {
    return (
      <div className= "information-container">
        <button className= "previous" onClick= {() => this.previousSlider()}></button>
        <ul className= "list-container">
          {
            this.props.locationDetails.map(loc => (
              <Information locationDetails= {loc} index= {this.state.index}/>
            ))
          }
        </ul>
        <button className= "next" onClick= {() => this.nextSlider()}></button>
      </div>
    );
  }
}

export default Map;
