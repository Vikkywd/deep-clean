import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../Apis";

const AddEnquire = createAsyncThunk('user/enquire', async(data)=>{
    try {
        const result = await axios.post(API.UserEnquire, {data});
        return result;
    } catch (error) {
    console.log('error: ', error);
        
    }
})

const EnquireList = createAsyncThunk('user/enquire-list', async(data)=>{
    const result = await axios.post(API.EnquireList, {});
    return result;
});

const DeleteEnquire = createAsyncThunk('user/delet-enquire', async(data)=>{
    const {_id} = data
    const result = await axios.post(API.DeleteEnquire, {_id});
    return result;
})

const enquireSlice = createSlice({
    name: "enquire",
    initialState: {
        data: null,
        success: true,
        error: null,
    },
    reducers: { 
    },
    extraReducers: (builder)=>{
            builder.addCase(AddEnquire.fulfilled, (state, action)=>{
                state.data = action.payload.data;
                state.success = action.payload.success;
                state.error = null; 
            });
            builder.addCase(EnquireList.fulfilled, (state,action)=>{
                state.data = action.payload.data;
                state.success = action.payload.success,
                state.error = null
            });
            builder.addCase(DeleteEnquire.fulfilled, (state,action)=>{
                state.data = action.payload.data;
                state.success = action.payload.success;
                state.error = null
            })
    }

})


export {AddEnquire, EnquireList, DeleteEnquire};
export default enquireSlice.reducer