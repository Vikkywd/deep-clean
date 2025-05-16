import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../Apis";


const WorkerList = createAsyncThunk('user/worker-list', async()=>{
    const result = await axios.post(API.WorkerList, {});
    return result;
})

const AddWorker = createAsyncThunk('user/add-worker', async(data)=>{
    const result = await axios.post(API.AddWorker, data);
    return result;
})

const worker = createSlice({
    name: 'worker',
    initialState: {
        workerData : [],
        success: true,
        error: null
    },
    reducers: {},
    extraReducers : (builder)=>{
        builder.addCase(AddWorker.fulfilled, async(state, action)=>{
            state.workerData = action.payload.data;
            state.success = action.payload.success;
            state.error = null
        })
    }
});

export {WorkerList, AddWorker}
export default worker.reducer;