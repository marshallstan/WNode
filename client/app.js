import React from 'react'
import ReactDom from 'react-dom'
import {AppContainer} from 'react-hot-loader';
import App from './App.jsx'

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default;
    ReactDom.render(<NextApp />, document.getElementById('root'));
  })
} else {
  ReactDom.hydrate(<App />, document.getElementById('root'));
}