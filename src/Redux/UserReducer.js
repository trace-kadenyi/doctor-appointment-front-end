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
    createPending: false,
    createRejected: false,
    createFulfilled: false
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    signOut(state) {
      // notify the user that he was signed out
      // rerender the login page.
      console.log('signed out');
      state.currentUser = {};
      localStorage.removeItem('currentUser');
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.pending = true;
    }, 
    [fetchUsers.rejected]: (state, action) => {
      // render the error
      state.error = action.payload
      state.pending = false
      state.rejected = true
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.fulfilled = true;
      state.pending= false;
      // this is just for testing purposes users shouldn't be public.
      localStorage.removeItem('users');
      localStorage.setItem('users', JSON.stringify(action.payload));
    }, 
    [fetchCreateUser.pending]: (state, action) => {
      state.createPending = true;
    }, 
    [fetchCreateUser.rejected]: (state, action) => {
      // render the error
      state.createRejected = true;
      state.createPending = false;
      state.error = action.payload;
    },
    [fetchCreateUser.fulfilled]: (state, action) => {
      state.createFulfilled = true;
      state.createPending = false;
      state.currentUser = action.payload;
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
