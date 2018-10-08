import React from 'react'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import ActionEvent from '@material-ui/icons/Event'
import Snackbar from '@material-ui/core/Snackbar'

import * as matchSelectActions from '../ducks/match-select'
import * as gapiAuthActions from '../ducks/gapi-auth'

class Match extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    // Faster way to access home and away team objects
    this.homeTeam = this.props.match.home_team
    this.awayTeam = this.props.match.away_team
    this.state = {
      selected: false,
      zdepth: 1,
      added: false
    }
  }

  createMatchEvent = match => {
    const channels = []
    match.channels.forEach(channel => channels.push(channel.name))
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
    }
    return event
  }

  handleRequestClose = () => {
    this.setState({...this.state, added: false})
  }

  addToCalender = () => {
    const CLIENT_ID = '768720964204-48u037qgfqlfleek3md9skltbce4n7lf.apps.googleusercontent.com'
    const SCOPES = 'https://www.googleapis.com/auth/calendar'
    const self = this
    gapi.load('client:auth2', () => {
      gapi.auth2.init({ client_id: CLIENT_ID, scope: SCOPES }).then(() => {
        const auth2 = gapi.auth2.getAuthInstance()
        if (!auth2.isSignedIn.get())
          auth2.signIn()
        gapi.client.load('calendar', 'v3', () => {
          const request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': this.createMatchEvent(this.props.match)
          })
          request.execute(event => {
            self.props.gapiAuth && self.setState({...self.state, added: true})
          })
        })
      })
    })
  }

  render() {
    return (
      <Paper
        className={`paper ${this.props.chosen ? 'chosen' : ''}`}
        zdepth={this.props.chosen ? 2 : 1}
        onClick={() => this.props.selectActions.chooseMatch(this.props.match.id)}
      >
        <Snackbar
          open={this.state.added}
          message="Event added to your calendar"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
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
            return (<span key={channel.id} className="channel">{channel.name}</span>)
            })}
          </section>
          <section className="row action">
            <Button variant="contained" color="secondary">
              Add to calendar
              <ActionEvent />
            </Button>
          </section>
        </section>
        }
      </Paper>
      )
      }
      }


      const mapDispatchToProps = dispatch => {
      return {
      selectActions: bindActionCreators(matchSelectActions, dispatch),
      gapiActions: bindActionCreators(gapiAuthActions, dispatch)
      }
      }

const mapStateToProps = store => {
  return {
    gapiAuth: store.gapiAuth.signedIn
  }
}

      export default connect(null, mapDispatchToProps)(Match)
