import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import UserWrapper from './user'
import loginStyles from './styles/login-style'

@inject(stores => ({
  appState: stores.appState,
  user: stores.appState.user
}))
@observer
class UserLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accesstoken: '',
      helpText: ''
    }
  }

  componentWillMount() {
    if (this.props.user.isLogin) {
      this.props.history.replace('/user/info')
    }
  }

  // getFrom = (location) => {
  //   location = location || this.props.location
  //   const query = queryString.parse(location.search)
  //   return query.from || '/user/info'
  // }
  //
  handleLogin = () => {
    if (!this.state.accesstoken) {
      return this.setState({
        helpText: 'Required!'
      })
    }
    this.setState({
      helpText: ''
    })
    return this.props.appState.login(this.state.accesstoken)
      .then(() => {
        this.props.history.replace('/user/info')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleInput =(event) => {
    this.setState({
      accesstoken: event.target.value.trim()
    })
  }

  render() {
    const classes = this.props.classes
    // const isLogin = this.props.user.isLogin
    // const from = this.getFrom()

    // if (isLogin) {
    //   return (
    //     <Redirect to={from} />
    //   )
    // }

    return (
      <UserWrapper>
        <div className={classes.root}>
          <TextField
            label="Wnode AccessToken"
            placeholder="Wnode AccessToken"
            required
            helperText={this.state.helpText}
            value={this.state.accesstoken}
            onChange={this.handleInput}
            className={classes.input}
          />
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleLogin}
            className={classes.loginButton}
          >
            Login In
          </Button>
        </div>
      </UserWrapper>
    )
  }
}

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
}

UserLogin.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  // location: PropTypes.object.isRequired
}

export default withStyles(loginStyles)(UserLogin)
// export default withStyles(loginStyles)(inject((stores) => {
//   return {
//     appState: stores.appState,
//     user: stores.appState.user
//   }
// })(observer(UserLogin)))
