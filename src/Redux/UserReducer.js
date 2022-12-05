import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const notify = (e) => toast(e);

const UserApi = 'http://localhost:3000/api/v1/users';

// fetch all users for smoother login
export const fetchUsers = createAsyncThunk('user/getUsers', async () => {
  const response = await axios.get(UserApi);
  return response.data;
});

// Create user on sign up params {name: ''}
export const fetchCreateUser = createAsyncThunk('user/signup', async (user) => fetch(UserApi, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(user),
}).then(async (res) => {
  const data = res.json();
  const user = await data;
  return user;
}));

const options = {
  name: 'User',
  initialState: {
    users: [],
    currentUser: {},
    error: '',
    pending: false,
    rejected: false,
    fulfilled: false,
  },
  reducers: {
    setCurrentUser(state, action) {
      const currentUserState = state;
      currentUserState.currentUser = action.payload;
    },
    signOut(state) {
      // rerender the login page.
      // remove current user.
      const currentUserState = state;
      currentUserState.currentUser = {};
      localStorage.removeItem('currentUser');
      // notify the user that he was signed out
      notify('signed out');
      // reload the page to render authentication.
      // window.location.reload();
    },
    setLoginUser(state, action) {
      const loginUserState = state;
      loginUserState.currentUser = action.payload;
      // navigate to the main page.
        <Navigate to="/" />;
        notify('user logged in!');
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      const pendingState = state;
      pendingState.pending = true;
      pendingState.fulfilled = false;
    },
    [fetchUsers.rejected]: (state, action) => {
      const rejectedState = state;
      // render the error
      rejectedState.error = action.error.message;
      rejectedState.pending = false;
      rejectedState.rejected = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      const fulfilledState = state;
      fulfilledState.users = action.payload;
      fulfilledState.fulfilled = true;
      fulfilledState.pending = false;
      // this is just for testing purposes users shouldn't be public.
    },
    [fetchCreateUser.pending]: (state) => {
      const pendingState = state;
      pendingState.pending = true;
      pendingState.fulfilled = false;
    },
    [fetchCreateUser.rejected]: (state, action) => {
      const rejectedState = state;
      // render the error
      rejectedState.rejected = true;
      rejectedState.pending = false;
      rejectedState.error = action.error.message;
    },
    [fetchCreateUser.fulfilled]: (state, action) => {
      const fulfilledState = state;
      fulfilledState.fulfilled = true;
      fulfilledState.pending = false;
      if (action.payload.id) {
        fulfilledState.currentUser = action.payload;
        // after user is created we set it in the local storage.
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
        // notify user is signed up
        notify('user signed up');
      } else {
        fulfilledState.error = action.payload.error;
      }
    },
  },
};

export const UserSlice = createSlice(options);
export const { setCurrentUser, signOut, setLoginUser } = UserSlice.actions;
export default UserSlice.reducer;
export const selectUsers = (state) => state.user.users;
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectAll = (state) => state.user;
