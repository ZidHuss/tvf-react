import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import { Provider } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { teal500 } from 'material-ui/styles/colors';

import App from './views/App';
import Main from './views/Main';
import './styles/main.scss';

injectTapEventPlugin();

// App Theme
const theme = getMuiTheme({
  palette: {
    primary1Color: teal500
  }
});

const routes = (
  <MuiThemeProvider muiTheme={theme}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Main} />
      </Route>
    </Router>
  </MuiThemeProvider>
)

ReactDOM.render(routes, document.getElementById('main'));
