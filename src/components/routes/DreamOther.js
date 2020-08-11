import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

// import messages from './../AutoDismissAlert/messages'

const DreamOther = (props) => {
  // starts the dream state as an empty array
  // array will hold the dreams
  const [otherDreams, setOtherDreams] = useState([])

  // const { msgAlert } = props
  // GET request to get all of the dreams user has created
  useEffect(() => {
    axios({
      url: `${apiUrl}/dreams-other`,
      method: 'GET'
    }, [])
      // sets the response
      .then(res => {
        console.log('received dream data is', res)
        return setOtherDreams(res.data.dreams)
      })
      // .then(res => setOtherDreams(res.data.otherDreams))
      .catch(console.error)
  }, [])

  const dreamsJsx = otherDreams.map(dream => (
    <div className="list-group" key={dream._id}>
      <ul>
        <li className="list-group-item list-group-item-action">
          <Link to={`/dreams/${dream._id}`}>{dream.title}</Link>
        </li>
      </ul>
    </div>
  ))
  // the dreamsjsx is returned and displayed under a heading.
  // button to Log a New dream will take user to create dream page.
  return (
    <div className="dream-style">
      <h4>Other Dreams</h4>
      <div>
        <div className="dream-display">
          {dreamsJsx}
        </div>
      </div>
    </div>
  )
}

export default DreamOther
