import React from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';


function fancy() {
  console.log('I \'m fancy bro');
}

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this._toggle = this._toggle.bind(this);
  }

  _toggle(e) {
    e.preventDefault();
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
        <AppBar
          title="TV Football"
          onLeftIconButtonTouchTap={this._toggle}
          />
        <Drawer 
          docked={false}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
          />
      </div>
    );
  }
}
