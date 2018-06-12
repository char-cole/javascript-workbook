import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './Normalize.css';
import './App.css';

const urls = [
  {source:"https://i.imgur.com/xnXcHFq.png", alt:"Ice in Bloom", key:0},
  {source:"https://i.imgur.com/b9Rkh8V.png", alt:"Umi at Rest", key:1},
  {source:"https://i.imgur.com/ctM8fcC.png", alt:"Sappho's Excursion", key:2},
  {source:"https://i.imgur.com/LqLWlMM.png", alt:"Frodo at Play", key:3},
  {source:"https://i.imgur.com/8pemaDK.png", alt:"The Microbial Host", key:4},
  {source:"https://i.imgur.com/5RLkNkN.png", alt:"The Wary Anole", key:5},
  {source:"https://i.imgur.com/KKgfLZa.png", alt:"River Hunter", key:6},
  {source:"https://i.imgur.com/ocQIxpj.png", alt:"Crisp Leaves", key:7},
  {source:"https://i.imgur.com/Vk4wrtv.png", alt:"Local Wasp", key:8},
  {source:"https://i.imgur.com/EFEKzqd.png", alt:"Spider over Rotten Leaves", key:9},
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
      isLoaded: false,
    };
  }

  renderImage(imageURL) {
    return (
      <div className="imageHolder">
        <img src={imageURL.source} alt={imageURL.alt} onClick={() => this.setState({ photoIndex: imageURL.key, isOpen: true, })} />
      </div>
    );
  }

  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div className="imageGallery">
        <div className="displayImages grid-container">
          {urls.map(imageURL => this.renderImage(imageURL))}
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={urls[photoIndex].source}
            imageCaption={urls[photoIndex].alt}
            // Have not recovered image change functionality. Stuck looking at one at a time.
            // nextSrc={urls[(photoIndex + 1)].source % urls.length}
            // prevSrc={urls[(photoIndex - 1)].source % urls.length}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + urls.length - 1) % urls.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % urls.length,
              })
            }
          />
        )}
      </div>
    );
  }
}
