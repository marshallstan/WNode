import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'

import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import { lightBlue, pink } from '@material-ui/core/colors'

import App from './views/App'
import { AppState, TopicStore } from './store/store'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: pink,
    secondary: lightBlue,
    type: 'light'
  }
})
const generateClassName = createGenerateClassName()

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line

const createApp = (TheApp) => {
  class Main extends React.Component {
    componentDidMount() {
      const jssStyle = document.getElementById('jss-server-side')
      if (jssStyle && jssStyle.parentNode) {
        jssStyle.parentNode.removeChild(jssStyle)
      }
    }
    render() {
      return <TheApp />
    }
  }
  return Main
}

const appState = new AppState()
appState.init(initialState.appState || {})
const topicStore = new TopicStore(initialState.topicStore)

// const renderMethod = module.hot ? ReactDom.render : ReactDom.hydrate
const renderMethod = ReactDom.render
const root = document.getElementById('root')
const render = (Component) => {
  renderMethod(
    <AppContainer>
      <Provider appState={appState} topicStore={topicStore}>
        <BrowserRouter>
          <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
              <Component />
            </MuiThemeProvider>
          </JssProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>, root
  )
};

render(createApp(App))

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default //eslint-disable-line
    render(createApp(NextApp))
  })
}
