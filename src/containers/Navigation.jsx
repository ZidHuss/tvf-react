import React from 'react'
import { Link } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import ActionSearch from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'


export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  _toggle = () => {
    this.setState({open: !this.state.open})
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" onClick={this._toggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              TV Football
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.open} onClose={this._toggle}>
          <div tabIndex={0} role="button" onClick={this._toggle} onKeyDown={this._toggle}>
            <ListItem component={Link} to="/" button>
              <ListItemText primary="Matches" />
            </ListItem>
            <ListItem component={Link} to="/about" button>
              <ListItemText primary="About" />
            </ListItem>
          </div>
        </Drawer>
      </div>
    )
  }
}
