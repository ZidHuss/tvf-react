import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CircularProgress from 'material-ui/CircularProgress';

import Match from '../components/Match';
import * as matchFetchActions from '../ducks/match-fetch';

class Main extends React.Component {

  dayNames = date => {
    const d = moment(date, 'YYYY-MM-DD');
    if (d.isSame(moment(), 'day')) {
      return 'Today';
    } else if (d.isSame(moment().add(1, 'day'), 'day')) {
      return 'Tomorrow';
    } else {
      return d.format('dddd Do MMMM');
    }
  }

  componentWillMount = () => {
    this.props.actions.fetchMatches();
  }

  render() {
    return (
      <section className="main">
        {this.props.isFetching && <CircularProgress />}
        {this.props.matches && this.props.matches.map(day => {
          return (
            <section className="match-day" key={day.date}>
              <h5 className="day-name">{this.dayNames(day.date)}</h5>
              {day.matches.map(match => {
              return (
              <Match
                key={match.id}
                chosen={this.props.chosen === match.id}
                match={match} />
              );
              }, this)}
            </section>
          );
          }, this)}
      </section>
    );
  }
}

const mapStateToProps = store => {
  return {
    chosen: store.matchSelect.chosen,
    matches: store.matchFetch.matches,
    isFetching: store.matchFetch.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(matchFetchActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
