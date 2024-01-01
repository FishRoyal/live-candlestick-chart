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
        },
        setToDeafulState(state) {
            state.lastMessage = {} as CandleData;
            state.history = null;
            state.xData = null;
        }
    },
    name: 'state'
})


export const {setLastMessage, setHistory, setXData, setToDeafulState} = candles.actions;

export default candles.reducer;