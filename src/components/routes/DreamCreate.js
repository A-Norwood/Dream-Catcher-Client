import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import DreamForm from './../shared/DreamForm'
import messages from './../AutoDismissAlert/messages'

const DreamCreate = (props) => {
  // state of the dream starts as empty string
  const [dream, setDream] = useState({ date: '', title: '', location: '', sleep_time: '', wake_time: '', description: '', quality: '', meaning: '' })
  // state starts as null, to be updated when dream is created
  const [createdDreamId, setCreatedDreamId] = useState(null)
  // uses handle change and passes in the event as param to handle the action
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    console.log('event.target: ', event.target)
    console.log('updated field: ', updatedField)
    //  sets the newly created dream to an object
    const editedDream = Object.assign({}, dream, updatedField)
    setDream(editedDream)
  }
  // submits the change
  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert } = props
    // POST request to relate with backend to actually create the dream
    axios({
      url: `${apiUrl}/dreams`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { dream }
    })
      // sets the updated data information to the dream id specified
      .then(res => setCreatedDreamId(res.data.dream._id))
      // success message if dream created
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
  // if dream is created, take the user to the newly created dream
  if (createdDreamId) {
    return <Redirect to={`/dreams/${createdDreamId}`} />
  }
  // the form for the user to fill out to create a dream. Uses handleSubmit and handleChange
  // cancel path takes user back to all dreams page.
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
