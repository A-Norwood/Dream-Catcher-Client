import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const Dream = (props) => {
  const [dream, setDream] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props
  useEffect(() => {
    axios({
      url: `${apiUrl}/dreams/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setDream(res.data.dream))
      // .catch(console.error)
      .then(() => msgAlert({
        heading: 'Showing selected dream',
        message: messages.showDreamSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setDream({ date: '', title: '', location: '', sleep_time: '', wake_time: '', description: '', quality: '', meaning: '' })
        msgAlert({
          heading: 'Failed to show dream ' + error.message,
          message: messages.showDreamFailure,
          variant: 'danger'
        })
      })
  }, [])
  const destroy = () => {
    axios({
      url: `${apiUrl}/dreams/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))

      .then(() => msgAlert({
        heading: 'Dream Deleted',
        message: messages.deleteDreamSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setDream({ date: '', title: '', location: '', sleep_time: '', wake_time: '', description: '', quality: '', meaning: '' })
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.deleteDreamFailure,
          variant: 'danger'
        })
      })
  }
  if (!dream) {
    return <p>Loading...</p>
  }
  if (deleted) {
    return (
      <Redirect to={{
        pathname: '/dreams', state: { msg: 'Dream succesfully deleted!' }
      }} />
    )
  }

  return (
    <div>
      <h4>{dream.title}</h4>
      <p>
        <br /> Date: {dream.date}
        <br /> Sleep Location: {dream.location}
        <br /> Time I fell asleep: {dream.sleep_time}
        <br /> Time I woke up: {dream.wake_time}
        <br /> Dream description: {dream.description}
        <br /> Sleep Quality: {dream.quality}
        <br /> Dream Meaning: {dream.meaning}
      </p>
      <button onClick={destroy}>Delete Dream</button>
      <Link to={`/dreams/${props.match.params.id}/edit`}>
        <button>Edit Dream</button>
      </Link>
      <Link to='/dreams'>Back to all dreams</Link>
    </div>
  )
}
export default Dream
