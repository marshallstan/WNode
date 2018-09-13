import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { Tabs, Tab } from '@material-ui/core'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
// import Button from '@material-ui/core/Button'

import { AppState } from '../../store/store'
import Container from '../layout/container'
import TopicListItem from './list-item'

@inject(stores => (
  {
    appState: stores.appState,
    topicStore: stores.topicStore
  }
))
@observer
export default class TopicList extends React.Component {
  state = {
    tabIndex: 0,
  }

  componentDidMount() {
    this.props.topicStore.fetchTopics()
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
    const { topicStore } = this.props
    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing

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
        <List>
          {
            topicList.map(topic => (
              <TopicListItem
                key={topic.id}
                onClick={this.listItemClick}
                topic={topic}
              />
            ))
          }
        </List>
        {
          syncingTopics &&
            <div>
              <CircularProgress color="secondary" size={100} />
            </div>
        }
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.object.isRequired
}
