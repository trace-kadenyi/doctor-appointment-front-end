import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../Redux/UserReducer';

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return (
    <section>
      {!currentUser
        ? (<h1 className="text-danger">Check your internet Again</h1>)
        : (
          <div>
            bamo finko
            {currentUser.id}
          </div>
        )}
      <button type="button" onClick={() => dispatch(signOut())}>sign out</button>
    </section>
  );
};

export default Home;
