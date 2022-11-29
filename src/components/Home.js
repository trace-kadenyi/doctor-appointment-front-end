import React from 'react'

const Home = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return (
    <section>
      {!currentUser 
      ? (<h1 className="text-danger">Check your internet Again</h1>) 
      : <div>bamo finko {currentUser.id}</div>
      }
    </section>
  )
}

export default Home;