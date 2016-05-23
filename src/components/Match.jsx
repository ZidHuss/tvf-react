import React from 'react';

import Paper from 'material-ui/Paper';

export default class Match extends React.Component {
  static propTypes = {
    match: React.PropTypes.object.isRequired
  }

  // Faster way to access home and away team objects
  homeTeam = this.props.match.home_team;
  awayTeam = this.props.match.away_team;

  render() {
    return (
      <Paper className="paper" zDepth={1}>
        <section className="row">
          <section className="home-team">{this.homeTeam.name}</section>
          <section className="time">
              {this.props.match.time.substr(0,5)}
          </section>
          <section className="away-team">{this.awayTeam.name}</section>
        </section>
        <section className="row">
        </section>
      </Paper>
    );
  }
}

