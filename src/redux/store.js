import { configureStore  } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import enquireReducer from './slices/enquireSlice';
import bookingReducer from './slices/bookingSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        enquire: enquireReducer,
        booking: bookingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;