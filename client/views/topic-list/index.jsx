import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import queryString from 'query-string'

import { Tabs, Tab } from '@material-ui/core'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'

import { AppState } from '../../store/store'
import Container from '../layout/container'
import TopicListItem from './list-item'
import { tabs } from '../../util/variable-define'

@inject(stores => (
  {
    appState: stores.appState,
    topicStore: stores.topicStore
  }
))
@observer
export default class TopicList extends React.Component {
  componentDidMount() {
    const tab = this.getTab()
    this.props.topicStore.fetchTopics(tab)
  }

  asyncBootstrap = () => (
    new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 5
        resolve(true)
      })
    })
  )

  getTab = () => {
    const query = queryString.parse(this.props.location.search)
    return query.tab || 'all'
  }

  changeTab = (e, value) => {
    this.props.history.push({
      pathname: '/list',
      search: `?tab=${value}`
    })
  }

  listItemClick = () => {}

  render() {
    const { topicStore } = this.props
    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing
    const tab = this.getTab()

    return (
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description!" />
        </Helmet>
        <Tabs indicatorColor="primary" value={tab} onChange={this.changeTab}>
          {
            Object.keys(tabs).map(t => (
              <Tab key={t} label={tabs[t]} value={t} />
            ))
          }
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

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object
}
