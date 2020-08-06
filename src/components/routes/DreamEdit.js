import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import DreamForm from '../shared/DreamForm'
import messages from './../AutoDismissAlert/messages'

const DreamEdit = props => {
  // dreamEdit takes props as pararms, state starts as empty string
  const [dream, setDream] = useState({
    date: '',
    title: '',
    location: '',
    sleep_time: '',
    wake_time: '',
    description: '',
    quality: '',
    meaning: ''
  })
  // updated starts are false, to be changed when edit is complete
  const [updated, setUpdated] = useState(false)
  const { msgAlert } = props
  //  functions like a componentDidMount
  // GET request to get the current information from selected dream
  useEffect(() => {
    axios({
      url: `${apiUrl}/dreams/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
    // response gets the information from specified dream that user wants to update
      .then(res => setDream(res.data.dream))
      .catch(console.error)
  }, [])
  const handleChange = event => {
    event.persist()
    setDream(prevDream => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedDream = Object.assign({}, prevDream, updatedField)
      return editedDream
    })
  }
  // PATCH request to send to API to actually update dream information
  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/dreams/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { dream }
    })
    // changes the setUpdated state from false(default) to true
      .then(() => setUpdated(true))
      // .catch(console.error)
      // success message if dream updated
      .then(() => msgAlert({
        heading: 'Edited Dream',
        message: messages.editDreamSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setDream({ date: '', title: '', location: '', sleep_time: '', wake_time: '', description: '', quality: '', meaning: '' })
        msgAlert({
          heading: 'Failed to update ' + error.message,
          message: messages.editDreamFailure,
          variant: 'danger'
        })
      })
  }
  // if dream was updated, redirect user to that dream
  if (updated) {
    return <Redirect to={`/dreams/${props.match.params.id}`} />
  }
  return (
    <div>
      <DreamForm
        dream={dream}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/dreams/${props.match.params.id}`}
      />
    </div>
  )
}
export default DreamEdit
