import React from 'react'
import { Link } from 'react-router-dom'
import Routes from '../config/router'

export default class App extends React.Component {
  componentDidMount() {}
  render() {
    return [
      <div>
        <Link to="/" >Index</Link>
        <Link to="/detail" >Detail Page</Link>
      </div>,
      <Routes />,
    ]
  }
}
