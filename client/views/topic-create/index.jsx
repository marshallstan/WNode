import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer
} from 'mobx-react'
import SimpleMDE from 'react-simplemde-editor'

import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
import IconReply from '@material-ui/icons/Reply'
import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/core/styles'

import Container from '../layout/container'
import createStyles from './styles'
import { tabs } from '../../util/variable-define'

@inject(stores => ({
  topicStore: stores.topicStore,
  // appState: stores.appState
}))
@observer
class TopicCreate extends React.Component {
  state = {
    title: '',
    content: '',
    tab: 'dev',
    message: '',
    open: false
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  handleContentChange = (value) => {
    this.setState({
      content: value
    })
  }
  handleChangeTab = (e) => {
    this.setState({
      tab: e.currentTarget.value
    })
  }

  handleCreate = () => {
    const { tab, title, content } = this.state
    // const appState = this.props.appState
    if (!title) {
      return this.showMessage('Title is required')
      // return appState.notify({
      //   message: 'Title is required',
      // })
    }
    if (!content) {
      return this.showMessage('Content is required')
      // return appState.notify({
      //   message: 'Content is required',
      // })
    }
    return this.props.topicStore.createTopic(title, tab, content)
      .then(() => {
        this.props.history.push('/')
      })
      .catch((err) => {
        this.showMessage(err.message)
        // appState.notify({
        //   message: err.message,
        // })
      })
  }
  showMessage = (message) => {
    this.setState({
      open: true,
      message
    })
  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const { classes } = this.props
    const { message, open } = this.state
    return (
      <Container>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          message={message}
          open={open}
          autoHideDuration={2000}
          onClose={this.handleClose}
        />
        <div className={classes.root}>
          <TextField
            className={classes.title}
            label="Title"
            value={this.state.title}
            onChange={this.handleTitleChange}
            fullWidth
          />
          <SimpleMDE
            onChange={this.handleContentChange}
            value={this.state.newReply}
            options={{
              toolbar: false,
              spellChecker: false,
              placeholder: 'Content'
            }}
          />
          <div>
            {
              Object.keys(tabs).map((tab) => {
                if (tab !== 'all' && tab !== 'good') {
                  return (
                    <span className={classes.selectItem} key={tab}>
                      <Radio
                        value={tab}
                        checked={tab === this.state.tab}
                        onChange={this.handleChangeTab}
                      />
                      {tabs[tab]}
                    </span>
                  )
                }
                return null
              })
            }
          </div>
          <Button
            variant="fab"
            color="primary"
            onClick={this.handleCreate}
            className={classes.replyButton}
          >
            <IconReply />
          </Button>
        </div>
      </Container>
    )
  }
}

TopicCreate.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  // appState: PropTypes.object.isRequired
}

TopicCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withStyles(createStyles)(TopicCreate)
