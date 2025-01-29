import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const GET_CAR_BY_USERID_API = BACKEND_URL + "cars/user";
const GET_CAR_BY_ID_API = BACKEND_URL + "cars";
const GET_ALL_CAR_API = BACKEND_URL + "cars";
const SEARCH_CAR_API = BACKEND_URL + "cars/search";
const ADD_CAR_API = BACKEND_URL + "cars/create";
const UPDATE_CAR_API = BACKEND_URL + "cars/update";
const DELETE_CAR_API = BACKEND_URL + "cars/delete";

// Load user cars from localStorage
// Load user cars from localStorage safely
let storedCars = [];
try {
  const carsData = localStorage.getItem("userCars");
  storedCars = carsData ? JSON.parse(carsData) : [];
} catch (error) {
  console.error("Error parsing stored cars data:", error);
  storedCars = [];
}

// Initial State
const initialState = {
  cars: storedCars,
  status: 'idle', 
  error: null,
};


// Fetch all cars of a user
export const fetchCars = createAsyncThunk(
    'cars/fetchCars',
    async ({ userId, token }, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${GET_CAR_BY_USERID_API}/${userId}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch cars');
      }
    }
  );

// Fetch all cars available
export const fetchAllCars = createAsyncThunk(
    'cars/fetchCars',
    async ({  token }, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${GET_ALL_CAR_API}/`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response)
        return response.data.cars;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch cars');
      }
    }
  );

export const fetchCarById = createAsyncThunk(
    'cars/fetchCars',
    async ({ id, token }, { rejectWithValue }) => {
      try {

        const response = await axios.get(
          `${GET_CAR_BY_ID_API}/${id}`, 
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.car;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch cars');
      }
    }
  );
  

// Add a new car
export const addCar = createAsyncThunk(
  "cars/addCar",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(ADD_CAR_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Update Car **
export const updateCar = createAsyncThunk(
  'cars/updateCar',
  async ({ id, data ,token}, { rejectWithValue }) => {
    try {

      const response = await axios.put(
        `${UPDATE_CAR_API}/${id}`, data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Car details updated successfully')
      console.log(response)
      return response.data.car;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cars');
    }
  }
);

// Remove a car
export const removeCar = createAsyncThunk(
  'cars/removeCar',
  async ({id,token}, { rejectWithValue }) => {
    try {
      await axios.delete(`${DELETE_CAR_API}/${id}` ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
       );
      toast.success("Car removed successfully!");
      return carId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove car');
    }
  }
);

export const searchCars = createAsyncThunk(
  'cars/searchCars',
  async ({query ,token}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SEARCH_CAR_API}?query=${query}` , 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      return response.data.cars;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search cars');
    }
  }
);

// ** Car Slice **
const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    // Logout: Clear car data when the user logs out
    clearCars(state) {
      state.cars = [];
      localStorage.removeItem("userCars");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload.data;
        state.status = 'succeeded';
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
        localStorage.setItem("userCars", JSON.stringify(state.cars)); // Persist in localStorage
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        // Find the car and update it
        state.cars = state.cars.map(car => 
          car.id === action.payload.id ? action.payload : car
        );
        localStorage.setItem("userCars", JSON.stringify(state.cars)); // Persist in localStorage
      })
      .addCase(removeCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter(car => car.id !== action.payload);
        localStorage.setItem("userCars", JSON.stringify(state.cars)); // Persist in localStorage
      });
  },
});

export const { clearCars } = carSlice.actions;
export default carSlice.reducer;
