import { createSlice } from "@reduxjs/toolkit";
import { CandleData, CandlesData, CandlesXData } from "./candleType";

const initialState: CandlesData = {
    lastMessage: {} as CandleData,
    history: null,
    xData: null
}

const candles = createSlice({
    initialState,
    reducers: {
        setLastMessage(state, action: {
            payload: CandleData,
            type: string
        }) {
            state.lastMessage = action.payload
        },
        setHistory(state, action: {
            payload: CandleData[],
            type: string
        }) {
            state.history = action.payload
        },
        setXData(state, action: {
            payload: CandlesXData,
            type: string
        }) {
            state.xData = action.payload
        }
    },
    name: 'state'
})


export const {setLastMessage, setHistory, setXData} = candles.actions;

export default candles.reducer;