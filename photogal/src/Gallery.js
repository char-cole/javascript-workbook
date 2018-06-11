import React, { Component } from 'react';

class Gallery extends React.Component {



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
};

// Gallery.propTypes = {
//   imageURLs: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
// };

export default Gallery;
