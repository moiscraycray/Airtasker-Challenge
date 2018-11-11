import React, { Component, Fragment } from 'react';
import './App.css';
import data from './data/activity_feed.json';
import ActivityFeed from './components/activity-feed.js'

class App extends Component {

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="grid box_shadow">
            <ActivityFeed data={data} />
          </div>

        </div>
      </Fragment>
    );
  }
}

export default App;
