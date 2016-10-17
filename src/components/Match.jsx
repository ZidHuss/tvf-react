import React from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ActionEvent from 'material-ui/svg-icons/action/event';

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

  createMatchEvent = match => {
    const channels = [];
    match.channels.forEach(channel => channels.push(channel.name));
    const event = {
      'summary': `${match.home_team.name} vs ${match.away_team.name}`,
      'description': `${match.competition.name} on ${channels.join(', ')}`,
      'start': {
        'dateTime': moment(`${match.date} ${match.time}`).format()
      },
      'end': {
        'dateTime': moment(`${match.date} ${match.time}`).add(2, 'h').format(),
      },
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 60},
          {'method': 'popup', 'minutes': 15}
        ]
      }
    };
    return event;
  };

  addToCalender = () => {
    const CLIENT_ID = '768720964204-48u037qgfqlfleek3md9skltbce4n7lf.apps.googleusercontent.com';
    const SCOPES = 'https://www.googleapis.com/auth/calendar';
    const eventWindow = window.open('', '_blank');
    gapi.load('client:auth2', () => {
      gapi.auth2.init({ client_id: CLIENT_ID, scope: SCOPES }).then(() => {
        const auth2 = gapi.auth2.getAuthInstance();
        if (!auth2.isSignedIn.get())
          auth2.signIn();
        gapi.client.load('calendar', 'v3', () => {
          const request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': this.createMatchEvent(this.props.match)
          });
          request.execute(event => eventWindow.location.href = event.htmlLink);
        });
      });
    });
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
        <section>
          <section className="row extra-info">
            <span className="competition">{this.props.match.competition.name}</span>
            {this.props.match.channels.map(channel => {
            return (<span key={channel.id} className="channel">{channel.name}</span>);
            })}
          </section>
          <section className="row action">
            <RaisedButton
              label="Add to Calendar"
              labelPosition="before"
              onClick={() => this.addToCalender()}
              disabled={true}
              primary={true}
              icon={<ActionEvent />}
            />
            </section>
            </section>
        }
      </Paper>
      );
      }
      }


      const mapDispatchToProps = dispatch => {
      return {
      actions: bindActionCreators(matchSelectActions, dispatch)
      };
      };

      export default connect(null, mapDispatchToProps)(Match);
