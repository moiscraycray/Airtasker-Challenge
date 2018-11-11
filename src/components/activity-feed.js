import React, { Component, Fragment } from 'react'

class ActivityFeed extends Component {
  constructor(props) {
    super(props)
  }

  getName = () => {
    let profileIdObj = {}
    this.props.data.profiles.forEach((x) => {
      profileIdObj[x.id] = x.abbreviated_name
    })
    return profileIdObj // returns object with id as key and name as value

    //output: {37: "Simon R.", 490: "James T.", 1501: "Jonathan L.", 2046: "Kang C.", 2663: "Edward T."}
  }

  getEvent = () => {
    let eventList = []
    this.props.data.activity_feed.map((x) => {
      eventList.push(x)
    })
    return eventList
  }

  getTaskName = () => {
    let taskName = {}
    this.props.data.tasks.forEach((x) => {
      taskName[x.id] = x.name
    })
    return taskName
    // output: {6333: "Buy me McDonalds", 6441: "Teach me how to fly a drone", 6469: "Pick up roses from florist", 6470: "Take me to rails camp", 6471: "Do a react javascript test for me", 6472: "Pick my car up from garage", 6473: "Guitar lessons"}
  }

  displayFeed = (name, action, task, secondName = '') => {
    if (action === 'posted') {
      return (
        <li className="col-12 col-bleed-x border-bottom">
          <span className="blue">{name}</span>
          <span className="uppercase xsmall boulder"> posted a task </span>
          <span className="blue">{task}</span>
        </li>
      )
    } else if (action === 'completed') {
      return (
        <li className="col-12 col-bleed-x border-bottom">
          <span className="blue">{name}</span>
          <span className="uppercase xsmall boulder"> completed </span>
          <span className="blue">{task}</span>
        </li>
      )
    } else if (action === 'assigned') {
      return (
        <li className="col-12 col-bleed-x border-bottom">
          <span className="blue">{name}</span>
          <span className="uppercase xsmall boulder"> assigned </span>
          <span className="blue">{task}</span>
          <span className="uppercase xsmall boulder"> to </span>
          <span className="blue">{secondName}</span>
        </li>
      )
    } else if (action === 'bid') {
      return (
        <li className="col-12 col-bleed-x border-bottom">
          <span className="blue">{name}</span>
          <span className="uppercase xsmall boulder"> bid on </span>
          <span className="blue">{task}</span>
        </li>
      )
    } else if (action === 'comment') {
      return (
        <li className="col-12 col-bleed-x border-bottom">
          <span className="blue">{name}</span>
          <span className="uppercase xsmall boulder"> commented on </span>
          <span className="blue">{task}</span>
        </li>
      )
    } else if (action === 'joined') {
      return (
        <li className="col-12 col-bleed-x border-bottom">
          <span className="blue">{name}</span>
          <span className="uppercase xsmall boulder"> signed up </span>
        </li>
      )
    } else {
      return <p>error</p>
    }
  }

  getFeed = () => {
    const nameId = this.getName() ////output: {37: "Simon R.", 490: "James T.", 1501: "Jonathan L.", 2046: "Kang C.", 2663: "Edward T."}
    const events = this.getEvent() // {created_at: "2015-06-24T16:33:43+10:00", template: "{ profiles:37 } assigned { task:6333 } to { profiles:1501 }", event: "assigned", task_id: 6333, profile_ids: Array(2)}
    const taskName = this.getTaskName()
    const displayFeed = this.displayFeed
    let feed = events.map((x) => {
      // console.log(nameId[x.profile_ids]) = undefined
      // console.log(x.profile_ids)
      if (x.event === 'assigned') {
        let first = x.profile_ids[0]
        let second = x.profile_ids[1]
        return displayFeed(nameId[first], x.event, taskName[x.task_id], nameId[second])
      } else {
        return displayFeed(nameId[x.profile_ids], x.event, taskName[x.task_id])
      }
    })
    return feed
  }

  render() {
    return (
      <Fragment>
        <ul className="col-12 col-bleed-y">{this.getFeed()}</ul>
      </Fragment>
    )
  }
}

export default ActivityFeed
