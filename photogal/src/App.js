import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './Normalize.css';
import './App.css';
// import Images from './ImagesFromAPI';
// import Gallery from './Gallery';

class App extends Component {

  renderImage(imageURL) {
    return (
      <div>
        <img src={imageURL} />
      </div>
    );
  }

  render() {
    const urls = [
      "https://imgur.com/Vk4wrtv",
      "https://imgur.com/EFEKzqd",
      "https://imgur.com/KKgfLZa"
    ];

    return (
      <div className="imageGallery">
        <div className="displayImages">
          {this.props.imageURLs.map(imageURL => this.renderImage(imageURL))}
        </div>
      </div>
    )
  }
}

export default App;
