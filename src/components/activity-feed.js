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

  getProfile = () => {
    let profileId = []
    this.props.data.activity_feed.map((x) => {
      profileId.push(x.profile_ids)
    })
    return profileId
  }

  getEvent = () => {
    let eventList = []
    this.props.data.activity_feed.map((x) => {
      if (x.event === 'posted') {
        eventList.push('posted a task')
      } else if (x.event === 'completed') {
        eventList.push(x.event)
      } else if (x.event === 'bid') {
        eventList.push('bid on')
      } else if (x.event === 'comment') {
        eventList.push('commented on')
      } else if (x.event === 'posted') {
        eventList.push('posted a task')
      } else if (x.event === 'joined') {
        eventList.push('signed up')
      } else {
        eventList.push('assigned')
      }
    })
    return eventList
  }

  getTaskId = () => {
    let taskId = []
    this.props.data.activity_feed.map((x) => {
      taskId.push(x.task_id)
    })
    return taskId
    //output: [6441, 6473, 6333, 6333, 6333, 6333, 6472, 6471, 6470, undefined]
  }

  getNameFeed = () => {
    const nameId = this.getName() // {37: "Simon R.", 490: "James T.", 1501: "Jonathan L.", 2046: "Kang C.", 2663: "Edward T."}
    const profile = this.getProfile()
    let name = []
    profile.map((x) => {
      name.push(nameId[x])
    })
    return name
  }

  render() {
    const nameFeed = this.getNameFeed().map((x) => {
      return <li>{x}</li>
    })

    const eventFeed = this.getEvent().map((x) => {
      return <li>{x}</li>
    })

    const taskFeed = this.getTaskId().map((x) => {
      return <li>{x}</li>
    })

    return (
      <Fragment>
        <ul className="col-auto col-bleed-y names">{nameFeed}</ul>
        <ul className="col-auto col-bleed">{eventFeed}</ul>
        <ul className="col-auto col-bleed">{taskFeed}</ul>
      </Fragment>
    )
  }
}

export default ActivityFeed
