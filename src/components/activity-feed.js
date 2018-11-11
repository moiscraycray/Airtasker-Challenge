import React, { Component, Fragment } from 'react'

class ActivityFeed extends Component {
  constructor(props) {
    super(props)
  }

  getName = () => {
    let profileName = {}
    const profiles = this.props.data.profiles
    profiles.forEach((x) => {
      profileName[x.id] = x.abbreviated_name
    })
    return profileName
  }

  getSlugName = () => {
    let slug = {}
    const profiles = this.props.data.profiles
    profiles.forEach((x) => {
      slug[x.id] = x.slug
    })
    return slug
  }

  getSlugTask = () => {
    let slug = {}
    const tasks = this.props.data.tasks
    tasks.forEach(x => slug[x.id] = x.slug)
    return slug
  }

  getEvent = () => {
    let eventList = []
    const activity = this.props.data.activity_feed
    activity.map((x) => {
      eventList.push(x)
    })
    return eventList
  }

  getTaskName = () => {
    let taskName = {}
    const tasks = this.props.data.tasks
    tasks.forEach((x) => {
      taskName[x.id] = x.name
    })
    return taskName
  }

  displayFeed = (name, action, task, taskSlug, firstNameSlug, secondNameSlug = '', secondName = '') => {
    if (action === 'posted') {
      return (
        <li className="col-12 col-bleed-x border-bottom">
          <a href={`/users/${firstNameSlug}`}>
            <span className="blue">{name}</span>
          </a>
          <span className="uppercase xsmall boulder"> posted a task </span>
          <a href={`/tasks/${taskSlug}`}>
            <span className="blue">{task}</span>
          </a>
        </li>
      )
    } else if (action === 'completed') {
      return (
        <li className="col-12 col-bleed-x border-bottom">
          <a href={`/users/${firstNameSlug}`}>
            <span className="blue">{name}</span>
          </a>
          <span className="uppercase xsmall boulder"> completed </span>
          <a href={`/tasks/${taskSlug}`}>
            <span className="blue">{task}</span>
          </a>
        </li>
      )
    } else if (action === 'assigned') {
      return (
        <li className="col-12 col-bleed-x border-bottom">
          <a href={`/users/${firstNameSlug}`}>
            <span className="blue">{name}</span>
          </a>
          <span className="uppercase xsmall boulder"> assigned </span>
          <a href={`/tasks/${taskSlug}`}>
            <span className="blue">{task}</span>
          </a>
          <span className="uppercase xsmall boulder"> to </span>
          <a href={`/users/${secondNameSlug}`}>
            <span className="blue">{secondName}</span>
          </a>
        </li>
      )
    } else if (action === 'bid') {
      return (
        <li className="col-12 col-bleed-x border-bottom">
          <a href={`/users/${firstNameSlug}`}>
            <span className="blue">{name}</span>
          </a>
          <span className="uppercase xsmall boulder"> bid on </span>
          <a href={`/tasks/${taskSlug}`}>
            <span className="blue">{task}</span>
          </a>
        </li>
      )
    } else if (action === 'comment') {
      return (
        <li className="col-12 col-bleed-x border-bottom">
          <a href={`/users/${firstNameSlug}`}>
            <span className="blue">{name}</span>
          </a>
          <span className="uppercase xsmall boulder"> commented on </span>
          <a href={`/tasks/${taskSlug}`}>
            <span className="blue">{task}</span>
          </a>
        </li>
      )
    } else if (action === 'joined') {
      return (
        <li className="col-12 col-bleed-x border-bottom">
          <a href={`/users/${firstNameSlug}`}>
            <span className="blue">{name}</span>
          </a>
          <span className="uppercase xsmall boulder"> signed up </span>
        </li>
      )
    } else {
      return <p>error</p>
    }
  }

  getFeed = () => {
    const nameId = this.getName()
    const events = this.getEvent()
    const taskName = this.getTaskName()
    const displayFeed = this.displayFeed
    const slugName = this.getSlugName()
    const slugTask = this.getSlugTask()
    let feed = events.map((x) => {
      if (x.event === 'assigned') {
        let firstName = x.profile_ids[0]
        let secondName = x.profile_ids[1]
        return displayFeed(nameId[firstName], x.event, taskName[x.task_id], slugTask[x.task_id], slugName[firstName], slugName[secondName], nameId[secondName])
      } else {
        return displayFeed(nameId[x.profile_ids], x.event, taskName[x.task_id], slugTask[x.task_id], slugName[x.profile_ids])
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
