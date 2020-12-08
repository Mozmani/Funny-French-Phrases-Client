import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='homepage'>
      <h2>Let's learn some funny french phrases!</h2>
      <h3>What is spaced repetition?</h3>
      <p>Spaced repetition is a learning concept that involves spacing out 
        learning events by regularly reviewing material.
      </p>
      <p>Using spaced repetition has been said to 'optimise the learning process'. 
        This method helps to create long term memory and imporve the active recall of studied material. </p>
        <p>
          Learn Funny French Phrases is a spaced repetition application to learn 
          some funny french expressions!
        </p>
        <Link to='/dashboard'> Lets get started!</Link>
    </div>
  )
}

export default HomePage
