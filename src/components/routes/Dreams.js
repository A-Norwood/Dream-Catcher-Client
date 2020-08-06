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
      .then(res => {
        console.log(res)
        return res
      })
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
    <ul key={dream._id}>
      <li>
        <Link to={`/dreams/${dream._id}`}>{dream.title}</Link>
      </li>
    </ul>
  ))
  console.log(dreamsJsx)
  return (
    <div className="dream-style">
      <h4>My Dreams</h4>
      <div className="center">
        <div className="dream-display">
          {dreamsJsx}
        </div>
      </div>
      <Link to={'/create-dream'}>
        <button className="button btn btn-success" >Create Dream</button>
      </Link>
    </div>
  )
}

export default Dreams
