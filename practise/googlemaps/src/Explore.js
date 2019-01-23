import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'

class Explore extends Component {

  state = {
    photo: 'block',
    time: 'none',
    review: 'none'
  }
  showImages = () => {
    this.setState(prevState => {
      return {photo: 'block', time: 'none', review: 'none'}
    })
  }
  showTimings = () => {
    this.setState(prevState => {
      return {photo: 'none', time: 'block', review: 'none'}
    })
  }
  showReviews = () => {
    this.setState(prevState => {
      return {photo: 'none', time: 'none', review: 'block'}
    })
  }
  render() {
    return (
      <div className= "main-container">
        <div className= "link-container">
          <ul className= "link-list">
            <li key= "Images"><button onClick = {() => {this.showImages()}}>Images</button></li>
            <li key= "Timings"><button onClick = {() => {this.showTimings()}}>Timings</button></li>
            <li key= "Reviews"><button onClick = {() => {this.showReviews()}}>Reviews</button></li>
          </ul>
        </div>
        <Link to= "/" className= "home"></Link>
        <div className= "photo-container" style= {{display: `${this.state.photo}`}}>
          <ul className= "photo-list-container">
            {
              this.props.locationDetails !== undefined && (
                this.props.locationDetails.photos.map(photo => (
                  <li className= "photo-list" style= {{backgroundImage: `url(${photo.getUrl()})`}}></li>
                ))
              )
            }
          </ul>
        </div>
        <div className= "time-container" style= {{display: `${this.state.time}`}}>
          {
            this.props.locationDetails !== undefined && (
              this.props.locationDetails.hours.map(hr => (
                <div className= "time-list-container">
                  <div className= "day">{hr.split(/:\s/g)[0]}</div>
                  <div className= "time">{hr.split(/:\s/g)[1]}</div>
                </div>
              ))
            )
          }
        </div>
        <div className= "review-container" style= {{display: `${this.state.review}`}}>
          <ul className= "review-list-container">
            {
              this.props.locationDetails !== undefined && (
                this.props.locationDetails.reviews.map(review => (
                  <li className= "review-list">
                    <span className= "name">{review.author_name}</span>
                    <span className= "review">{review.text}</span>
                  </li>
                ))
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}
export default Explore
