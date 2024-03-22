import { configureStore } from "@reduxjs/toolkit";
import { newsPerPageReducer, newsPageReducer, pagesLoadedReducer, totalPagesReducer} from "./Lab4/Lab4Reducer";
import AuthBearerReducer from "./Auth/AuthReducer";

// так как передается объект ключ - значение, неявно вызывается функция combineReducers
const store = configureStore({
    reducer: {
        newsPerPage: newsPerPageReducer,
        newsPage: newsPageReducer,
        newsLoader: pagesLoadedReducer,
        newsTotalPages: totalPagesReducer,

        auth: AuthBearerReducer
    }
})

export default store