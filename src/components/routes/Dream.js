import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const Dream = (props) => {
  // single dreams starts with a state of null, to be changed once setDream used
  const [dream, setDream] = useState(null)
  // deleted starts with a state of false, to be changed once setDeleted used
  const [deleted, setDeleted] = useState(false)
  // for messages to show, need to set them to props
  const { msgAlert } = props
  // GET to show the list with the id that matches the params in url
  useEffect(() => {
    axios({
      url: `${apiUrl}/dreams/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
    // updates the state with the data from dream that was specified by id above
      .then(res => setDream(res.data.dream))
      // .catch(console.error)
      // success message when a dream is shown
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
  // delete action to delete the dream that is specified by its id.
  const destroy = () => {
    axios({
      url: `${apiUrl}/dreams/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      // updates the delete state to true
      .then(() => setDeleted(true))
      // success message if dream deleted successfully
      .then(() => msgAlert({
        heading: 'Dream Deleted',
        message: messages.deleteDreamSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setDream({ date: '', title: '', location: '', sleep_time: '', wake_time: '', description: '', quality: '', meaning: '' })
        // message if dreams failed to show
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.deleteDreamFailure,
          variant: 'danger'
        })
      })
  }
  // if there's no dream to show where user clicked, show "loading..."
  if (!dream) {
    return <p>Loading...</p>
  }
  // if a dream is deleted, Redirect user back to the list of all dreams
  if (deleted) {
    return (
      <Redirect to={{
        pathname: '/dreams', state: { msg: 'Dream succesfully deleted!' }
      }} />
    )
  }

  return (
    // shows the specified fields(all details of the dream) when a dream is clicked
    <div>
      <h4>{dream.title}</h4>
      <p className="dream-border">
        <br /> <span className="dream-info">Date:</span><span className='jsx'>{dream.date}</span>
        <br /> <span className="dream-info">Sleep Location:</span><span className='jsx'> {dream.location}</span>
        <br /> <span className="dream-info">Time I fell asleep:</span> <span className='jsx'>{dream.sleep_time}</span>
        <br /> <span className="dream-info">Time I woke up:</span> <span className='jsx'>{dream.wake_time}</span>
        <br /> <span className="dream-info">Dream description:</span> <span className='jsx'>{dream.description}</span>
        <br /> <span className="dream-info">Sleep Quality:</span> <span className='jsx'>{dream.quality}</span>
        <br /> <span className="dream-info">Dream Meaning:</span><span className='jsx'> {dream.meaning}</span>
      </p>
      {/*  button to click to delete a dream */}
      <button className="btn btn-danger btn-lg" onClick={destroy}>Delete Dream</button>
      {/*  // Link to take user to the edit page once the Edit Dream button is clicked */}
      <Link to={`/dreams/${props.match.params.id}/edit`}>
        <button className="btn btn-info btn-lg">Edit Dream</button>
      </Link>
      <div>
        {/* Link to take user back to all dreams list */}
        <Link className="back" to='/dreams'>Back to all dreams</Link>
      </div>
    </div>
  )
}
export default Dream
