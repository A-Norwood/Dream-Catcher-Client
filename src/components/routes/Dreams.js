import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const Dreams = (props) => {
  // starts the dream state as an empty array
  // array will hold the dreams
  const [dreams, setDreams] = useState([])

  const { msgAlert } = props
  // GET request to get all of the dreams user has created
  useEffect(() => {
    axios({
      url: `${apiUrl}/dreams`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    }, [])
      // sets the response
      .then(res => setDreams(res.data.dreams))
      // success message if user is viewing all lists
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
  // returns the dream title, title is a link so user can click that directly to get more information other than title on dream (refer to Dream.js)
  const dreamsJsx = dreams.map(dream => (
    <div className="list-group" key={dream._id}>
      <ul>
        <li className="list-group-item list-group-item-info">
          <Link to={`/dreams/${dream._id}`}>{dream.title}</Link>
        </li>
      </ul>
    </div>
  ))
  // the dreamsjsx is returned and displayed under a heading.
  // button to Log a New dream will take user to create dream page.
  return (
    <div className="dream-style">
      <h4>My Dream Log</h4>
      <div>
        <div className="dream-display">
          {dreamsJsx}
        </div>
      </div>
      <Link to={'/create-dream'}>
        <button className="button btn btn-primary btn-lg" >Log New Dream</button>
      </Link>
    </div>
  )
}

export default Dreams
