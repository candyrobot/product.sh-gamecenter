import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './product.game.2048/App';
import Game2048 from './product.game.2048/object/Game2048';
import * as serviceWorker from './serviceWorker';

new Game2048();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
