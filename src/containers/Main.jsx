import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import { chooseMatch } from '../ducks/match-select';
import Match from '../components/Match';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: []
    };
  }
  componentWillMount = () => {
    axios.get('http://tvfootball.zidhuss.tech/api/matches', {
      params: {
        start: moment().format('YYYY-MM-DD'),
        end: moment().add(7, 'days').format('YYYY-MM-DD')
      }
    })
    .then(response => {
      this.setState({
        days: response.data.data
      });
    });
  }

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

  render() {
    return (
      <section className="main">
        {this.state.days.map(day => {
          return (
            <section className="match-day">
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
    chosen: store.matchSelect.chosen
  };
};

export default connect(mapStateToProps)(Main);
