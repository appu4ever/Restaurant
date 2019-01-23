import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
class Information extends Component {

  render() {
    return (

        <li key= {this.props.locationDetails.placeId} className= "information-list"  style= {{transform: `translateX(-${parseInt(this.props.index) * 100}%)`}}>
          <div className= "card">
            <div className= "image-container" style= {{backgroundImage: `url(${this.props.locationDetails.image})`}}>
              <div className= "header"><span className= "heading">{this.props.locationDetails.title}</span></div>
            </div>
            <div className= "address-container">
              <span style= {{textTransform: 'uppercase',fontWeight: 'bold'}}>Address: </span>
              <span>{this.props.locationDetails.address}</span>
            </div>
            <div className= "phone-container">
              <span style= {{textTransform: 'uppercase',fontWeight: 'bold'}}>Phone: </span>
              <span>{this.props.locationDetails.phone}</span>
              <span><Link to = "/Explore" className= "explore" style= {{backgroundColor: 'rgba(211,211,211,0.7)'}}>Explore</Link></span>
            </div>

          </div>
        </li>

    )
  }
}
export default Information
