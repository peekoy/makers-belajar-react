import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  login as loginService,
  getUsername,
} from '../../services/auth.service';

// Thunk untuk menangani login asinkron
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const token = await loginService(data);
      localStorage.setItem('token', token);
      return getUsername(token);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Invalid credentials';
      return rejectWithValue(errorMessage);
    }
  }
);

const token = localStorage.getItem('token');
let initialUser = null;
if (token) {
  try {
    initialUser = getUsername(token);
  } catch (e) {
    localStorage.removeItem('token');
  }
}

const initialState = {
  user: initialUser,
  loading: false,
  error: null,
};

console.log(initialState.user);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('pending');
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log('fulfiled');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log('rejected');
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
