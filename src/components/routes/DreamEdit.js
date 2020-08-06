import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import DreamForm from '../shared/DreamForm'
import messages from './../AutoDismissAlert/messages'

const DreamEdit = props => {
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
  const [updated, setUpdated] = useState(false)
  const { msgAlert } = props
  //  functions like a componentDidMount
  useEffect(() => {
    axios({
      url: `${apiUrl}/dreams/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
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
      .then(() => setUpdated(true))
      // .catch(console.error)
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
