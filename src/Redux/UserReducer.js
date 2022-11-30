import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const UserApi = 'http://localhost:3000/api/v1/users';

// fetch all users for smoother login
export const fetchUsers = createAsyncThunk('user/getUsers', async () => {
  const res = await fetch(UserApi);
  const data = res.json();
  const users = await data;
  return users;
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
      // notify the user that he was signed out
      // rerender the login page.
      const currentUserState = state;
      console.log('signed out');
      currentUserState.currentUser = {};
      localStorage.removeItem('currentUser');
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      const pendingState = state;
      pendingState.pending = true;
    },
    [fetchUsers.rejected]: (state, action) => {
      const rejectedState = state;
      // render the error
      rejectedState.error = action.payload;
      rejectedState.pending = false;
      rejectedState.rejected = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      const fulfilledState = state;
      fulfilledState.users = action.payload;
      fulfilledState.fulfilled = true;
      fulfilledState.pending = false;
      // this is just for testing purposes users shouldn't be public.
      localStorage.removeItem('users');
      localStorage.setItem('users', JSON.stringify(action.payload));
    },
    [fetchCreateUser.pending]: (state) => {
      const pendingState = state;
      pendingState.pending = true;
    },
    [fetchCreateUser.rejected]: (state, action) => {
      const rejectedState = state;
      // render the error
      rejectedState.rejected = true;
      rejectedState.pending = false;
      rejectedState.error = action.payload;
    },
    [fetchCreateUser.fulfilled]: (state, action) => {
      const fulfilledState = state;
      fulfilledState.fulfilled = true;
      fulfilledState.pending = false;
      fulfilledState.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
  },
};

export const UserSlice = createSlice(options);
export const { setCurrentUser, signOut } = UserSlice.actions;
export default UserSlice.reducer;
export const selectUsers = (state) => state.user.users;
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectAll = (state) => state.user;
