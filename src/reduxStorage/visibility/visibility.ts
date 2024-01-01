import { createSlice } from "@reduxjs/toolkit";

export type Visibility = {
    isVisibile: boolean
}

const initialState: Visibility = {
    isVisibile: true
}

const visibility = createSlice({
    initialState,
    reducers: {
        setVisibility(state, action: {
            payload: boolean,
            type: string
        }) {
            state.isVisibile = action.payload
        },
    },
    name: 'state'
})


export const {setVisibility} = visibility.actions;

export default visibility.reducer;