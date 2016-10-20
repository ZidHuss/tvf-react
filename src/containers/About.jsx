import React from 'react'

import Paper from 'material-ui/Paper'

export default class About extends React.Component {
  render() {
    return (
      <section className="about">
        <Paper className="paper about-paper">
          <h4>About</h4>
          <p>
            This website displays information on football matches
            broadcasted in the UK. Created with <a
              href="https://facebook.github.io/react/">React</a>.
          </p>
          <p>
            The source for this project can be found on <a
              href="https://github.com/zidhuss/tvf-react">Github</a>.
          </p>
        </Paper>
      </section>
    )
  }
}
