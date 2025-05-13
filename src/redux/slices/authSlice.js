import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const login = createAsyncThunk('user/login', async (data) => {
    try {
        const result = await axios.post('https://dummyjson.com/auth/login', { username: 'emilys', password: 'emilyspass'})
        localStorage.setItem('token', result.data.accessToken);
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
        builder.addCase(login.fulfilled, (state, action) => {
            state.error = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.success = true;
        })

    }
})

export const { logout } = authSlice.actions;
export { login };
export default authSlice.reducer