import React from 'react'
// import PropTypes from 'prop-types'
// import marked from 'marked'
// import Helmet from 'react-helmet'
import {
  inject,
  observer
} from 'mobx-react'

// import { withStyles } from '@material-ui/core/styles'
// import Paper from '@material-ui/core/Paper'
// import { CircularProgress } from '@material-ui/core'

import Container from '../layout/container'

// import { topicDetailStyle } from './styles'
// import Reply from './reply'

@inject(stores => ({
  topicStore: stores.topicStore
}))
@observer
class TopicDetail extends React.Component {
  componentDidMount() {}
  render() {
    // const { classes } = this.props
    // const topic = this.props.topicStore.topics[0]
    // if (!topic) {
    //   return (
    //     <Container>
    //       <section className={classes.loadingContainer}>
    //         <CircularProgress color="accent" />
    //       </section>
    //     </Container>
    //   )
    // }
    return (
      <div>
        <Container>
          6
        </Container>
      </div>
    )
  }
}

export default TopicDetail
