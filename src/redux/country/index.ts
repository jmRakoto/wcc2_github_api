import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultCountry, ICountry } from "../../interfaces/country";

interface IError {
    type: string;
    value: boolean;
}

interface CountryState {
    value: ICountry[];
    country: ICountry | any;
    isLoading: boolean;
    error: IError;
}

const initialState: CountryState = {
    value: [],
    country: defaultCountry,
    isLoading: false,
    error: {type: '', value: false}
}

export const country = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setLoader: (state: CountryState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state: CountryState, action: PayloadAction<IError>) => {
            state.error = action.payload;
        },
        setAllCountry: (state: CountryState, action: PayloadAction<ICountry[]>) => {
            state.value = action.payload;
        },
        selectCountry: (state: CountryState, action: PayloadAction<ICountry>) => {
            state.country = action.payload;
        },
    }
});

export const { setLoader, setError, setAllCountry, selectCountry } = country.actions;
export default country.reducer;