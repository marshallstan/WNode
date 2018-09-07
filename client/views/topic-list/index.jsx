import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { Tabs, Tab } from '@material-ui/core'
// import Button from '@material-ui/core/Button'

import AppState from '../../store/app-state'
import Container from '../layout/container'
import TopicListItem from './list-item'

@inject('appState')
@observer
export default class TopicList extends React.Component {
  state = {
    tabIndex: 0,
  }

  asyncBootstrap = () => (
    new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 5
        resolve(true)
      })
    })
  )

  changeTab = (e, tabIndex) => {
    this.setState({ tabIndex })
  }

  listItemClick = () => {}

  render() {
    const { tabIndex } = this.state
    const topic = {
      title: 'This is title.',
      username: 'Marshall',
      image: '',
      tab: 'stan',
      reply_count: '20',
      visit_count: '30',
      create_at: '2018/10/10',
    }
    return (
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description!" />
        </Helmet>
        <Tabs indicatorColor="primary" value={tabIndex} onChange={this.changeTab}>
          <Tab label="All" />
          <Tab label="Share" />
          <Tab label="Work" />
          <Tab label="Question" />
          <Tab label="Masterwork" />
          <Tab label="Test" />
        </Tabs>
        <TopicListItem onClick={this.listItemClick} topic={topic} />
      </Container>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
