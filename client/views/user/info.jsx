import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { List, ListItem, ListItemText } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import UserWrapper from './user'
import infoStyles from './styles/user-info-style'

const TopicItem = (({ topic }) => (
  <ListItem>
    <Avatar src={topic.author.avatar_url} />
    <ListItemText
      primary={topic.title}
      secondary={`The Latest reply：${topic.last_reply_at}`}
    />
  </ListItem>
))

TopicItem.propTypes = {
  topic: PropTypes.object.isRequired
}

@inject(stores => ({
  user: stores.appState.user,
  // appState: stores.appState
}))
@observer
class UserInfo extends React.Component {
  componentWillMount() {
    if (!this.props.user.isLogin) {
      this.props.history.replace('/user/login')
    }
    // this.props.appState.getUserDetail()
    // this.props.appState.getUserCollection()
  }

  render() {
    const { classes } = this.props
    // const topics = this.props.user.detail.recent_topics
    // const replies = this.props.user.detail.recent_replies
    // const collections = this.props.user.collections.list
    const topics = []
    const replies = []
    const collections = []
    return (
      <UserWrapper>
        <div className={classes.root}>
          <Grid container spacing={16} align="stretch">
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>Recently released topics</span>
                </Typography>
                <List>
                  {
                    topics.length > 0 ?
                      topics.map(topic => <TopicItem topic={topic} key={topic.id} />) :
                      <Typography align="center">
                        No recently released topics
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>New responses</span>
                </Typography>
                <List>
                  {
                    replies.length > 0 ?
                      replies.map(topic => <TopicItem topic={topic} key={topic.id} />) :
                      <Typography align="center">
                        No new responses
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>Collections</span>
                </Typography>
                <List>
                  {
                    collections.length > 0 ?
                      collections.map(topic => <TopicItem topic={topic} key={topic.id} />) :
                      <Typography align="center">
                        No collections
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </UserWrapper>
    )
  }
}

UserInfo.wrappedComponent.propTypes = {
  // appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
}

export default withStyles(infoStyles)(UserInfo)
