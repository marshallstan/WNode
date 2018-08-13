import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import App from './views/App'

import appState from './store/app-state'

const renderMethod = module.hot ? ReactDom.render : ReactDom.hydrate
const root = document.getElementById('root')
const render = (Component) => {
  renderMethod(
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>, root,
  )
};

render(App)

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default //eslint-disable-line
    render(NextApp)
  })
}
