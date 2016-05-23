import React from 'react';

import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';


export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  _toggle = () => {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
        <AppBar
          title="TV Football"
          onLeftIconButtonTouchTap={this._toggle}
          iconElementRight={<IconButton><ActionSearch /></IconButton>} />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={open => this.setState({open})} />
      </div>
    );
  }
}
