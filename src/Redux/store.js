import { configureStore } from "@reduxjs/toolkit";
import { newsPerPageReducer, newsPageReducer, pagesLoadedReducer, totalPagesReducer} from "./Lab4/Lab4Reducer";
import AuthBearerReducer from "./Auth/AuthReducer";
import { wp_drafts_api } from "./services/gymnews";

// так как передается объект ключ - значение, неявно вызывается функция combineReducers
const store = configureStore({
    reducer: {
        newsPerPage: newsPerPageReducer,
        newsPage: newsPageReducer,
        newsLoader: pagesLoadedReducer,
        newsTotalPages: totalPagesReducer,

        auth: AuthBearerReducer,

        [wp_drafts_api.reducerPath]: wp_drafts_api.reducer,
    },

        // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(wp_drafts_api.middleware),
})

export default store