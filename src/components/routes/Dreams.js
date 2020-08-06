import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const Dreams = (props) => {
  const [dreams, setDreams] = useState([])

  const { msgAlert } = props
  // console.log(props)
  useEffect(() => {
    axios({
      url: `${apiUrl}/dreams`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    }, [])

      .then(res => setDreams(res.data.dreams))

      .then(() => msgAlert({
        heading: 'Showing all dreams',
        message: messages.showDreamsSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setDreams({ date: '', title: '', location: '', sleep_time: '', wake_time: '', description: '', quality: '', meaning: '' })
        msgAlert({
          heading: 'Failed to show all dreams ' + error.message,
          message: messages.showDreamsFailure,
          variant: 'danger'
        })
      })
  }, [])

  const dreamsJsx = dreams.map(dream => (
    <div className="list-group" key={dream._id}>
      <ul>
        <li className="list-group-item list-group-item-action">
          <Link to={`/dreams/${dream._id}`}>{dream.title}</Link>
        </li>
      </ul>
    </div>
  ))

  return (
    <div className="dream-style">
      <h4>My Dream Log</h4>
      <div className="center">
        <div className="dream-display">
          {dreamsJsx}
        </div>
      </div>
      <Link to={'/create-dream'}>
        <button className="button btn btn-success" >Log New Dream</button>
      </Link>
    </div>
  )
}

export default Dreams
