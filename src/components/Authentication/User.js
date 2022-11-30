import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import {
  fetchCreateUser, fetchUsers, selectAll, selectUsers, setCurrentUser,
} from '../../Redux/UserReducer';
import './user.css';

function User() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const userSelector = useSelector(selectAll);
  const loading = userSelector.pending;
  // notificaitons
  const notify = (e) => toast(e);
  // get the input value
  const [username, setUsername] = useState('');
  // fetch users once.
  useEffect(() => {
     dispatch(fetchUsers()); 
  }, [dispatch]);

  // log in the user
  const loginUser = (name) => {
    const currentUser = users.filter((e) => e.name === name);
    if (currentUser.length) {
      notify('user logged in!');
      // user is logged in render the home page, notify the user.
      dispatch(setCurrentUser(currentUser[0]));
      localStorage.setItem('currentUser', JSON.stringify(currentUser[0]));
    } else {
      // notify the message
      notify('username does not exists');
      document.getElementById('username-input').value = '';
    }
  };
  // sign up the user
  const signUp = (name) => {
    // check locally if the name already exists to avoid useless api call.
    const currentUser = users.filter((e) => e.name === name);
    if (currentUser.length) {
      // notify the message
      notify('username already exists, chose another one or login');
      document.getElementById('username-input').value = '';
    } else {
      // user is signed up
      // render the home page and notify the user.
      notify('user signed up!');
      dispatch(fetchCreateUser({ name }));
    }
  };

  return (
    <section className="login-section">
      { loading && <ClipLoader size={150} /> }
      { userSelector.fulfilled
      && (
      <form className="login-form">
        <h1>Welcome, Either log in or sign up.</h1>
        <input id="username-input" placeholder="enter your username" onChange={(e) => setUsername(e.target.value)} />
        <br />
        <div className="login-form-buttons">
          <button type="submit" onClick={(e) => { e.preventDefault(); loginUser(username); }}>log in</button>
          <button type="submit" onClick={(e) => { e.preventDefault(); signUp(username); }}>sign up</button>
        </div>
      </form>
      )}
      { userSelector.rejected && (
      <div className="error">
        {userSelector.error}
        {' '}
      </div>
      ) }
    </section>
  );
}
export default User;
