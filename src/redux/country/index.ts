import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultCountry, ICountry } from "../../interfaces/country";

interface IError {
    type: string;
    value: boolean;
}

interface CountryState {
    value: ICountry[];
    searchList: ICountry[];
    country: ICountry | any;
    isLoading: boolean;
    error: IError;
}

const initialState: CountryState = {
    value: [],
    searchList: [],
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
            state.searchList = action.payload;
        },
        selectCountry: (state: CountryState, action: PayloadAction<ICountry>) => {
            state.country = action.payload;
        },
        searchCountry: (state: CountryState, action: PayloadAction<string>) => {
            if (action.payload == "") {
                state.searchList = state.value;
            } else {
                state.searchList = state.value.filter((data: ICountry) => data.name.toLowerCase().includes(action.payload.toLowerCase()));
            }
        },
    }
});

export const { setLoader, setError, setAllCountry, selectCountry, searchCountry } = country.actions;
export default country.reducer;