import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  }
}

@withRouter
@inject(stores => ({
  user: stores.appState.user
}))
@observer
class MainAppBar extends React.Component {
  onHomeIconClick = () => {
    this.props.history.push('/')
  }
  createButtonClick = () => {
    this.props.history.push('/topic/create')
  }
  loginButtonClick = () => {
    if (this.props.user.isLogin) {
      this.props.history.push('/user/info')
    } else {
      this.props.history.push('/user/login')
    }
  }
  render() {
    const { classes } = this.props
    const user = this.props.user
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <ToolBar>
            <IconButton color="inherit" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              WNode
            </Typography>
            <Button variant="raised" color="primary" onClick={this.createButtonClick}>
              Create New
            </Button>
            <Button color="inherit" onClick={this.loginButtonClick}>
              {
                user.info.loginname || 'Login'
              }
            </Button>
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
}

export default withStyles(styles)(MainAppBar)
