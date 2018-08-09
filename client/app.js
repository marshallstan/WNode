import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App.jsx'

const renderMethod = module.hot ? ReactDom.render : ReactDom.hydrate;
const root = document.getElementById('root');
const render = (Component) => {
  renderMethod(
    <AppContainer>
      <Component />
    </AppContainer>, root,
  )
};

render(App);

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default; //eslint-disable-line
    render(NextApp);
  })
}
