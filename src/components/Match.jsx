import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import * as matchSelectActions from '../ducks/match-select';

class Match extends React.Component {
  static propTypes = {
    match: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    // Faster way to access home and away team objects
    this.homeTeam = this.props.match.home_team;
    this.awayTeam = this.props.match.away_team;
    this.state = {
      selected: false,
      zDepth: 1
    };
  }

  render() {
    return (
      <Paper
        className={`paper ${this.props.chosen ? 'chosen' : ''}`}
        zDepth={this.props.chosen ? 2 : 1}
        onClick={() => this.props.actions.chooseMatch(this.props.match.id)}
      >
        <section className="row">
          <section className="home-team">{this.homeTeam.name}</section>
          <section className="time">
              {this.props.match.time.substr(0,5)}
          </section>
          <section className="away-team">{this.awayTeam.name}</section>
        </section>
        { this.props.chosen &&
        <section className="row extra-info">
          <span className="competition">{this.props.match.competition.name}</span>
          {this.props.match.channels.map(channel => {
          return (<span key={channel.id} className="channel">{channel.name}</span>);
          })}
        </section>
        }
      </Paper>
    );
  }
}

// const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(matchSelectActions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Match);
