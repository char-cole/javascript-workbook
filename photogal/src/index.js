import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const urls = [
  {source:"https://i.imgur.com/xnXcHFq.png", alt:"Ice in Bloom"},
  {source:"https://i.imgur.com/Zo942Ba.png", alt:"Eye of the Dragon"},
  {source:"https://i.imgur.com/b9Rkh8V.png", alt:"Umi at Rest"},
  {source:"https://i.imgur.com/LqLWlMM.png", alt:"Frodo at Play"},
  {source:"https://i.imgur.com/N4PzAKk.png", alt:"Sappho's Excursion"},
  {source:"https://i.imgur.com/5RLkNkN.png", alt:"The Wary Anole"},
  {source:"https://i.imgur.com/KKgfLZa.png", alt:"River Hunter"},
  {source:"https://i.imgur.com/Btm5qxm.png", alt:"Inside the Cup"},
  {source:"https://i.imgur.com/Vk4wrtv.png", alt:"Local Wasp"},
  {source:"https://i.imgur.com/EFEKzqd.png", alt:"Spider over Rotten Leaves"},
];

ReactDOM.render(<App imageURLs={urls}/>, document.getElementById('root'));
registerServiceWorker();
