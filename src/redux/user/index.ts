import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces";
import { defaultIUser, defaultUser, IItem } from "../../interfaces/user";

interface IError {
    type: string;
    value: boolean;
}

interface UserState {
    value: IUser;
    user: IItem | any;
    isLoading: boolean;
    page: number;
    error: IError;
    perPage: number;
}

const initialState: UserState = {
    value: defaultIUser,
    user: defaultUser,
    isLoading: false,
    error: {type: '', value: false},
    page: 1,
    perPage: 10,
}

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoader: (state: UserState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state: UserState, action: PayloadAction<IError>) => {
            state.error = action.payload;
        },
        setAllUser: (state: UserState, action: PayloadAction<IUser>) => {
            state.value = action.payload;
        },
        selectUser: (state: UserState, action: PayloadAction<IItem>) => {
            state.user = action.payload;
        },
        setPage: (state: UserState, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setPerPage: (state: UserState, action: PayloadAction<number>) => {
            state.perPage = action.payload;
        },
    }
});

export const { setLoader, setError, setAllUser, selectUser, setPage, setPerPage } = user.actions;
export default user.reducer;