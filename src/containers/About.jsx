import React from 'react';

import Paper from 'material-ui/Paper';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zDepth: 1
    };
  }

  bringForward = () => {
    if (this.state.zDepth === 5) {
      this.setState({zDepth: 1});
    } else {
      this.setState({zDepth: ++this.state.zDepth});
    }
  }
  render() {
    return (
      <section className="about">
        <Paper
          className="paper"
          zDepth={this.state.zDepth}
          onClick={this.bringForward}>
          <h2 className="display-3">Huss</h2>
        </Paper>
      </section>
    );
  }
}
