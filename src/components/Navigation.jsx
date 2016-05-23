import React from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ActionSearch from 'material-ui/svg-icons/action/search';


export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this._toggle = this._toggle.bind(this);
  }

  _toggle(e) {
    // e.preventDefault();
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <section>
        <AppBar
          title="TV Football"
          onLeftIconButtonTouchTap={this._toggle}
          iconElementRight={<IconButton><ActionSearch /></IconButton>}
          />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
          >
          <Link to="/" onClick={this._toggle}>
            <MenuItem primaryText="Matches" />
          </Link>
          <Link to="/about" onClick={this._toggle}>
            <MenuItem primaryText="About" />
          </Link>
        </Drawer>
      </section>
    );
  }
}
