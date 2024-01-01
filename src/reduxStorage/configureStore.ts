import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { CandlesData } from "./candles/candleType"
import candles from "./candles/candles"
import visibility, { Visibility } from "./visibility/visibility"

export type RootReducer = {
    candles: CandlesData,
    visibility: Visibility
}

const rootReducer = combineReducers({
    candles,
    visibility
})

export const store = configureStore( 
    {
        reducer: rootReducer
    } )