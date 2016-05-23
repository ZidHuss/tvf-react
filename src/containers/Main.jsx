import React from 'react';
import Match from '../components/Match';

import jsonData from '../data/matches.json';

const matches = jsonData.data[1].matches;

export default class Main extends React.Component {
  render() {
    return (
      <section className="main">
        {matches.map((match, index) =>  <Match key={index} match={match} />)}
      </section>
    );
  }
}
