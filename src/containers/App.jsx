import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Navigation from '../containers/Navigation'
import Main from '../containers/Main'
import About from '../containers/About'


export default class App extends React.Component {
  render() {
    return (
      <section>
        <Navigation />
        <section className="content">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/about" component={About} />
          </Switch>
        </section>
      </section>
    )
  }
}
