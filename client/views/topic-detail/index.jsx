import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { CircularProgress } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconReply from '@material-ui/icons/Reply'

import SimpleMDE from 'react-simplemde-editor'
import dateFormat from 'dateformat'

import Container from '../layout/container'

import { topicDetailStyle } from './styles'
import Reply from './reply'

@inject(stores => ({
  topicStore: stores.topicStore,
  user: stores.appState.user
}))
@observer
class TopicDetail extends React.Component {
  state = {
    newReply: ''
  }
  componentDidMount() {
    const id = this.getTopicId()
    this.props.topicStore.getTopicDetail(id)
  }
  getTopicId = () => this.props.match.params.id;
  handleNewReplyChange = (newReply) => {
    this.setState({ newReply })
  };
  goToLogin = () => {
    this.props.history.push('/user/login')
  };
  doReply = () => {
    if (!this.state.newReply) return
    const id = this.getTopicId()
    const topic = this.props.topicStore.detailMap[id]
    topic.doReply(this.state.newReply)
      .then(() => {
        this.setState({ newReply: '' })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const { classes, user } = this.props
    const id = this.getTopicId()
    const topic = this.props.topicStore.detailMap[id]
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="primary" size={80} />
          </section>
        </Container>
      )
    }
    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>
        {
          topic.createdReplies && topic.createdReplies.length ?
            <Paper elevation={4} className={classes.replies}>
              <header className={classes.replyHeader}>
                <span>My latest replies</span>
                <span>{`${topic.createdReplies.length} ${topic.createdReplies.length > 1 ? 'replies' : 'reply'}`}</span>
              </header>
              {
                topic.createdReplies.map(reply => (
                  <Reply
                    key={reply.id}
                    reply={Object.assign({}, reply, {
                      author: {
                        avatar_url: user.info.avatar_url,
                        loginname: user.info.loginname
                      }
                    })}
                  />
                ))
              }
            </Paper> :
            null
        }
        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count} replies`}</span>
            <span>{`The latest reply: ${dateFormat(topic.last_reply_at, 'yyyy-mm-dd/hh:mm:ss')}`}</span>
          </header>
          {
            user.isLogin ?
              <section className={classes.replyEditor}>
                <SimpleMDE
                  onChange={this.handleNewReplyChange}
                  value={this.state.newReply}
                  options={{
                    toolbar: false,
                    autoFocus: false,
                    spellChecker: false,
                    placeholder: 'Add reply...'
                  }}
                />
                <Button
                  variant="fab"
                  color="primary"
                  onClick={this.doReply}
                  className={classes.replyButton}
                >
                  <IconReply />
                </Button>
              </section> :
              <section className={classes.notLoginButton}>
                <Button variant="raised" color="primary" onClick={this.goToLogin}>
                  Login In and Reply
                </Button>
              </section>
          }
          <section>
            {
              topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
            }
          </section>
        </Paper>
      </div>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(topicDetailStyle)(TopicDetail)
