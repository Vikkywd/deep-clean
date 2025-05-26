import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../Apis";

const AddBooking = createAsyncThunk('admin/add-booking', async(data)=>{
        const result = await axios.post(API.AddBooking, {data});
        return result

});

const AllBooking = createAsyncThunk('admin/all-booking', async(data)=>{
        const result = await axios.post(API.AllBooking, {status: data});
        return result
})



const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        allBookings: [],
        success: true,
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
                builder.addCase(AddBooking.fulfilled, (state,action)=>{
                    state.allBookings = action.payload.data
                    state.success = action.payload.success
                }),
                builder.addCase(AllBooking.fulfilled, (state,action)=>{
                    state.allBookings = action.payload.data.data;
                    state.success = action.payload.success
                })
               
    }
})

export {AddBooking, AllBooking}
export default bookingSlice.reducer