import { configureStore  } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import enquireReducer from './slices/enquireSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        enquire: enquireReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;