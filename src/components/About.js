import React from 'react';

const About = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return (
    <section>
      (
      <h1 className="text-danger">Check your internet Again</h1>
      )
      {!currentUser && <h1>This is about page</h1> }
    </section>
  );
};

export default About;
