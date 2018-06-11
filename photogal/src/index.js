import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const urls = [
  "https://i.imgur.com/Vk4wrtv.png",
  "https://i.imgur.com/b9Rkh8V.png",
  "https://i.imgur.com/EFEKzqd.png",
  "https://i.imgur.com/KKgfLZa.png",
  "https://i.imgur.com/LqLWlMM.png",
  "https://i.imgur.com/Btm5qxm.png",
  "https://i.imgur.com/N4PzAKk.png",
  "https://i.imgur.com/5RLkNkN.png",
  "https://i.imgur.com/Zo942Ba.png"
];

ReactDOM.render(<App imageURLs={urls}/>, document.getElementById('root'));
registerServiceWorker();
