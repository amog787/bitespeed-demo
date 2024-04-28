import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { nodeSlice } from "./features/nodeSlice";

const rootReducer = combineSlices(nodeSlice)

export const store = configureStore({
    reducer: rootReducer
})