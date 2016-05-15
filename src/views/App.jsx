import React from 'react';

import Navigation from '../layouts/Navigation';


export default class App extends React.Component {
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
