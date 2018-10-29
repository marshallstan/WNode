import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import UserLogin from '../views/user/login'
import UserInfo from '../views/user/info'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="first" />,
  <Route path="/list" component={TopicList} exact key="list" />,
  <Route path="/detail/:id" component={TopicDetail} exact key="detail" />,
  <Route path="/user/login" component={UserLogin} exact key="login" />,
  <Route path="/user/info" component={UserInfo} exact key="info" />
]
