import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import DreamForm from './../shared/DreamForm'
import messages from './../AutoDismissAlert/messages'

const DreamCreate = (props) => {
  const [dream, setDream] = useState({ date: '', title: '', location: '', sleep_time: '', wake_time: '', description: '', quality: '', meaning: '' })
  const [createdDreamId, setCreatedDreamId] = useState(null)
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedDream = Object.assign({}, dream, updatedField)
    setDream(editedDream)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert } = props
    axios({
      url: `${apiUrl}/dreams`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { dream }
    })
      // .then(res => console.log(res))
      .then(res => setCreatedDreamId(res.data.dream._id))
      .then(() => msgAlert({
        heading: 'Dream logged successfully',
        message: messages.createDreamSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setDream({ date: '', title: '', location: '', sleep_time: '', wake_time: '', description: '', quality: '', meaning: '' })
        msgAlert({
          heading: 'Dream log failed: ' + error.message,
          message: messages.createDreamFailure,
          variant: 'danger'
        })
      })
  }

  if (createdDreamId) {
    return <Redirect to={`/dreams/${createdDreamId}`} />
  }

  return (
    <div>
      <DreamForm
        dream={dream}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/dreams'
      />
    </div>
  )
}

export default DreamCreate
