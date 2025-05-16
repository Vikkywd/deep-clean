import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../Apis";

const loginApi = createAsyncThunk('user/login', async (data) => {
    try {
        const {email, password} = data;
        const result = await axios.post(API.AdminLogin, {email,password})
        localStorage.setItem('token', result.data.data.token);
        return result.data;
    } catch (error) {
        console.log('error: ', error);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        error: null,
        success: false
    },
    reducers: {
        logout: (state) => {
            state.user = null,
                state.token = null,
                state.error = null,
                state.success = false,
                localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginApi.fulfilled, (state, action) => {
            state.error = false;
            state.user = action.payload.data?.existingAdmin;
            state.token = action.payload.data?.token;
            state.success = true;
        })

    }
})

export const { logout } = authSlice.actions;
export { loginApi };
export default authSlice.reducer