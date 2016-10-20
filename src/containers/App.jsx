import React from 'react'

import Navigation from '../containers/Navigation'


export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }
  render() {
    return (
      <section>
        <Navigation />
        <section className="content">
          {this.props.children}
        </section>
      </section>
    )
  }
}
