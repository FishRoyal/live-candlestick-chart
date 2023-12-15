import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { CandlesData } from "./candles/candleType"
import candles from "./candles/candles"

export type RootReducer = {
    candles: CandlesData,
}

const rootReducer = combineReducers({
    candles
})

export const store = configureStore( {reducer: rootReducer} )