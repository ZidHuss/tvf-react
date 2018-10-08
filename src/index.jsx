import React from 'react'
import ReactDOM from 'react-dom'
// import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'

import App from './containers/App'
import store from './ducks/store'
import './styles/main.scss'


// App Theme
const theme = createMuiTheme({
  palette: {
    primary1Color: green['500']
  },
  typography: {
    useNextVariants: true,
  },
})


        // <Route path="/" component={App}>
        //   <IndexRoute component={Main} />
        //   <Route path="/about" component={About} />
        // </Route>
const routes = (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(routes, document.getElementById('main'))
