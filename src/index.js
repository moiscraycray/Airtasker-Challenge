import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/reflex.css';
import './styles/index.css';
import data from './data/activity_feed.json';
import ActivityFeed from './components/activity-feed.js'

class Index extends Component {

  render() {
    return (
      <div className="container">
        <div className="grid box_shadow">
          <ActivityFeed data={data} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
