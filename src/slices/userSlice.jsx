import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const SIGNUP_API = BACKEND_URL + "users/register";
const LOGIN_API = BACKEND_URL + "users/login";

// Safe parsing function
const getStoredUser = () => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : {}; // If null, return empty object
  } catch (error) {
    console.error("Error parsing stored user data:", error);
    localStorage.removeItem("user"); // Remove corrupted data
    return {}; // Return empty object
  }
};

const storedUser = getStoredUser();

// Initial state with persisted token
const initialState = {
  id: storedUser.id || null,
  name: storedUser.name || null,
  email: storedUser.email || null,
  token: storedUser.token || null,
  isAuthenticated: storedUser.token ? true : false,
};

export const Registration = createAsyncThunk(
  'accounts/signup',
  async (data, { rejectWithValue }) => {
    try {
      console.log(SIGNUP_API);
      const response = await axios.post(SIGNUP_API, data);
      console.log(response);

      if (!response.data.success) {
        throw new Error("Registration not completed, try again later");
      }

      toast.success("User created successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create an account');
    }
  }
);

export const Login = createAsyncThunk(
  'accounts/login',
  async (data, { rejectWithValue }) => {
    try {
      console.log(LOGIN_API);
      const response = await axios.post(LOGIN_API, data);
      console.log(response);

      if (!response.data.success) {
        throw new Error("Login failed, try again later");
      }

      toast.success("Login successful");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to login');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.id = null;
      state.name = null;
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // ✅ Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Registration.fulfilled, (state, action) => {
        state.id = action.payload.user._id;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        // Store token in localStorage for persistence
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: action.payload.user._id,
            name: action.payload.user.name,
            email: action.payload.user.email,
            token: action.payload.token,
          })
        );
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.id = action.payload.user._id;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        // ✅ Store token in localStorage for persistence
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: action.payload.user._id,
            name: action.payload.user.name,
            email: action.payload.user.email,
            token: action.payload.token,
          })
        );
      })
      .addCase(Registration.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(Login.rejected, (state, action) => {
        toast.error(action.payload);
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
