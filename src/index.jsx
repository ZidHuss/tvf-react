import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';


import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { teal500 } from 'material-ui/styles/colors';

import App from './containers/App';
import Main from './containers/Main';
import About from './containers/About';
import store from './ducks/store';
import './styles/main.scss';

injectTapEventPlugin();

// App Theme
const theme = getMuiTheme({
  palette: {
    primary1Color: teal500
  }
});

const routes = (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={theme}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Main} />
          <Route path="/about" component={About} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(routes, document.getElementById('main'));
