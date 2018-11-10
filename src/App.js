import React, { Component, Fragment } from 'react';
import './App.css';
import data from './data/activity_feed.json';

class App extends Component {

  componentDidMount() {
    console.log(data)
  }

  render() {
    return (
      <Fragment>
        <h1>hello</h1>
      </Fragment>
    );
  }
}

export default App;
