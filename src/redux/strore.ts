import { configureStore } from '@reduxjs/toolkit';
import contryReducer from "./country";
import userReducer from "./user";

export const store = configureStore({
    reducer: {
        country: contryReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;