import React from 'react'
import { Link } from 'react-router-dom'

// form with all fields that a dream requires to fill out with examples.
const DreamForm = ({ dream, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Dream Date</label>
      <input
        type="date"
        className="form-control"
        value={dream.date}
        name="date"
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Title</label>
      <input
        className="form-control"
        placeholder="Example: Teeth Fell Out Again"
        value={dream.title}
        name="title"
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Dream Location</label>
      <input
        className="form-control"
        placeholder="Example: Home"
        value={dream.location}
        name="location"
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Sleep Time</label>
      <input
        className="form-control"
        placeholder="Example: 10:30pm"
        value={dream.sleep_time}
        name="sleep_time"
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Wake Time</label>
      <input
        className="form-control"
        placeholder="Example: 7:30am"
        value={dream.wake_time}
        name="wake_time"
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Dream Description</label>
      <input
        className="form-control"
        placeholder="Example: My teeth fell out"
        value={dream.description}
        name="description"
        onChange={handleChange}
      />
    </div>
    <div className="form-group" value={dream.quality}>
      <label htmlFor="sel1" >Select: Sleep Quality</label>
      <select onChange={handleChange} name="quality" className="form-control" id="sel1">
        <option>Great</option>
        <option>Fair</option>
        <option>Poor</option>
      </select>
    </div>
    <div className="form-group">
      <label>Dream Meaning</label>
      <input
        className="form-control"
        placeholder="(Optional)Example: Losing Control"
        value={dream.meaning}
        name="meaning"
        onChange={handleChange}
      />
    </div>
    <br />
    {/* A submit button for user to click once fields filled */}
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to={cancelPath}>
      {/* Cancel button if user decides to cancel actions, takes them back to path specified */}
      <button className="btn btn-danger">Cancel</button>

    </Link>
  </form>
)

export default DreamForm
