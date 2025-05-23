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

const AssignTask = createAsyncThunk('user/assign-task', async(data)=>{
    const result = axios.post(API.AssignTask, data);
    return result
})

const WorkerTaskList = createAsyncThunk('user/worker-task-list', async(data)=>{
    const result = await axios.post(API.WorkerTaskList, {workerId: data});
    return result;
})

const TaskList = createAsyncThunk('worker/task-list', async()=>{
    const result = await axios.post(API.TaskList, {});
    return result;
})

const worker = createSlice({
    name: 'worker',
    initialState: {
        workerData : [],
        taskList:[],
        allTaskList: [],
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
        builder.addCase(AssignTask.fulfilled, async(state,action)=>{
            state.success = action.payload.success;
            state.error = action.payload.error;
        })
        builder.addCase(WorkerTaskList.fulfilled, async(state,action)=>{
            state.taskList = action.payload.data;
            state.success = action.payload.success;
            state.error = action.payload.error;
        })
        builder.addCase(TaskList.fulfilled,async(state,action)=>{
            state.allTaskList = action.payload.data;
            state.success = action.payload.success;
            state.error = action.payload.error
        })
    }
});

export {WorkerList, AddWorker, AssignTask, WorkerTaskList, TaskList}
export default worker.reducer;