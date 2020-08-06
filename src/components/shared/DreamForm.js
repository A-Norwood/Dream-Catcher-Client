import React from 'react'
import { Link } from 'react-router-dom'

const DreamForm = ({ dream, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Dream Date</label>
      <input
        placeholder="Example: 2020-02-16"
        value={dream.date}
        name="date"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Title</label>
      <input
        placeholder="Example: Teeth Fell Out Again"
        value={dream.title}
        name="title"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Dream Location</label>
      <input
        placeholder="Example: Home"
        value={dream.location}
        name="location"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Sleep Time</label>
      <input
        placeholder="Example: 10:30pm"
        value={dream.sleep_time}
        name="sleep_time"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Wake Time</label>
      <input
        placeholder="Example: 7:30am"
        value={dream.wake_time}
        name="wake_time"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Dream Description</label>
      <input
        placeholder="Example: My teeth fell out"
        value={dream.description}
        name="description"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Sleep Quality</label>
      <input
        placeholder="Example: Fair"
        value={dream.quality}
        name="quality"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Dream Meaning</label>
      <input
        placeholder="(Optional)Example: Losing Control"
        value={dream.meaning}
        name="meaning"
        onChange={handleChange}
      />
    </div>
    <br />
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to={cancelPath}>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default DreamForm
