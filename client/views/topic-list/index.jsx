import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import AppState from '../../store/app-state'

@inject('appState')
@observer
export default class TopicList extends React.Component {
  asyncBootstrap = () => (
    new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 5
        resolve(true)
      })
    })
  )

  changeName = (e) => {
    this.props.appState.changeName(e.target.value)
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description!" />
        </Helmet>
        <input type="text" onChange={this.changeName} />
        <span>{this.props.appState.msg}</span>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
