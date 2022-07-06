import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
   restaurants:  [],
   currentRestaurant: [],
};
// const baseUrl = 'http://localhost:3001'

export const getRestaurants = createAsyncThunk(
   "restaurants/fetchRestaurants",
   async () => {
      const response = await  axios(`http://localhost:3001/restaurant`)
      const result =  response.data.map(item => {
         return {
            ...item,
            position: {
               lat: item.location.coordinates[0],
               lng: item.location.coordinates[1],
            }
         }
      })
      return result;
   }
);

export const getCurrentRestaurant = createAsyncThunk(
    "restaurants/fetchCurrentRestaurant",
    async (id) => {
       const response = await  axios(`http://localhost:3001/restaurant/${id}`)
       return response.data;
    }
);

export const createRatingFetch = createAsyncThunk(
    "restaurants/fetchCurrentRestaurant",
    async ({restaurantId,value}) => {
       const response = await  axios.post(`http://localhost:3001/restaurant/rate`, {
          restaurantId: restaurantId,
          value: value,
       })
       console.log(response.data)
       return response.data;
    }
);

export const createComment = createAsyncThunk(
    "restaurants/fetchCreateComment",
    async ({id,comment}) => {
       const response = await  axios.post(`http://localhost:3001/restaurant/${id}/comment`, {
          username: 'tester',
          comment: comment,
       })
       return response.data;
    }
);

export const restaurantsSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      
   },
   extraReducers: builder => {
      builder
         .addCase(getRestaurants.pending, state => {
            state.loading = true;
         })
        .addCase(getRestaurants.fulfilled, (state, action) => {
            state.loading = false;
            state.restaurants = action.payload;
         })
          .addCase(getCurrentRestaurant.pending, state => {
             state.loading = true;
          })
          .addCase(getCurrentRestaurant.fulfilled, (state, action) => {
             state.loading = false;
             state.currentRestaurant = action.payload;
          })
          .addCase(createComment.pending, state => {
              state.loading = true;
          })
          .addCase(createComment.fulfilled, (state, action) => {
              state.loading = false;
              state.currentRestaurant = action.payload.restaurant;
          })
   },
});

export const selectRestaurants = state => state.restaurant.restaurants;
export const selectCurrentRestaurant = state =>
   state.restaurant.currentRestaurant;

export default restaurantsSlice.reducer;
