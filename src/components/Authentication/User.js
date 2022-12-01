import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import {
  fetchCreateUser, fetchUsers, selectAll, selectUsers, setCurrentUser, selectCurrentUser,
} from '../../Redux/UserReducer';
import './user.css';

function User() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const userSelector = useSelector(selectAll);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
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
    // find the user by filtering the users array.
    const currentUser = users.find((e) => e.name === name);
    if (currentUser) {
      notify('user logged in!');
      // user is logged in render the home page, notify the user.
      dispatch(setCurrentUser(currentUser));
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      // navigate to doctors page.
      navigate('/');
    } else {
      // notify the message
      notify('username does not exists');
      setUsername('');
      document.getElementById('username-input').value = '';
    }
  };
  // sign up the user
  const signUp = (name) => {
    // check if the name meets api requirments
    if (name.length < 3) return notify('username must be longer than 3 characters.');
    // check locally if the name already exists to avoid useless api call.
    const userExists = users.find((e) => e.name === name);
    if (userExists) return notify('username already exists');
    // call the api
    return dispatch(fetchCreateUser({ name }));
  };

  return (
    <section className="login-section">
      { loading && <ClipLoader size={150} /> }
      { (userSelector.fulfilled && !currentUser.id)
      && (
      <form className="login-form">
        <h1>Welcome, Either log in or sign up.</h1>
        <input maxLength={15} minLength={3} id="username-input" placeholder="enter your username" onChange={(e) => setUsername(e.target.value)} />
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
      { (currentUser.id) && <Navigate to="/" /> }
    </section>
  );
}
export default User;
