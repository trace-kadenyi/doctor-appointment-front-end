  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

  const UserApi = "http://localhost:3000/api/v1/users";

  // fetch all users for smoother login 
  export const fetchUsers = createAsyncThunk('user/getUsers', async () => {
    const res = await fetch(UserApi);
    const data = res.json();
    const users = await data;
    return users;
  });
  
  

  const options = {
    name: 'User',
    initialState: {
      users: [],
      currentUser: {}
    },
    reducers: {
      setCurrentUser: function (state, action) {
        state.currentUser = action.payload;
      }
    },
    extraReducers: {
      [fetchUsers.fulfilled]: (state, action) => { 
        state.users = action.payload;
        // this is just for testing purposes users shouldn't be public.
        localStorage.removeItem('users');
        localStorage.setItem('users', JSON.stringify(action.payload));
      },
      [fetchCreateUser.rejected]: (state,action) => {
        // render the error
      },
      [fetchCreateUser.fulfilled]: (state,action) => {
        state.currentUser = action.payload
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      }
    },
  };

  export const  UserSlice = createSlice(options);
  export const {setCurrentUser} = UserSlice.actions;
  export default UserSlice.reducer;
  export const selectUsers = (state) => state.user.users;
  export const selectCurrentUser = (state) => state.user.currentUser;
  export const selectError = (state) => state.user.error;
