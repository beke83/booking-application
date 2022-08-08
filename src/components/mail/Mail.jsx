import React from 'react';
import './mail.css'

const Mail = () => {
  return (
    <div className='mail'>
      <h1 className="mailTitle">Save TIME, Save Money!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      <div className="mailInputContainer">
          <input type="text" placeholder='Your email' />
          <button className="">Subscribe</button>
      </div>
    </div>
  )
}

export default Mail
