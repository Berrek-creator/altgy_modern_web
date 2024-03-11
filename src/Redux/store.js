import { configureStore } from "@reduxjs/toolkit";
import newsReduser from "./Lab4/Lab4Reducer";

const store = configureStore({
    reducer: newsReduser,
})

export default store