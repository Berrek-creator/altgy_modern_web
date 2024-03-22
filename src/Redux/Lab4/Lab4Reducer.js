import { combineReducers } from "redux"

const defaultNewsPerPage = {
    newsPerPage: 4
}

const defaultPage = {
    newsPage : 1
}

const defaultLoadedPages = {
    pages : {}
}

const defaultTotalPages = {
    totalPages: 1
}

export const newsPerPageReducer = (state = defaultNewsPerPage, action) => {
    if (action.type === 'CHANGE_NEWS_PER_PAGE') {
        return {
            ...state,
            newsPerPage: action.payload
        }
    }
    return state
}

export const newsPageReducer = (state = defaultPage, action) => {
    switch (action.type) {
        case "CHANGE_NEWS_PAGE":
            return {
                ...state,
                newsPage: action.payload
            }
        case "NEXT_PAGE":
            return {
                ...state,
                newsPage: state.newsPage + 1
            }
        case "PREV_PAGE":
            return {
                ...state,
                newsPage: state.newsPage - 1
            }
        default:
            return state
    }
}


// https://stackoverflow.com/questions/45643453/adding-a-key-value-to-a-dictionary-in-redux
export const pagesLoadedReducer = (state = defaultLoadedPages, action) => {
    switch (action.type) {
        case "STORE_PAGE":
            return {
                ...state,
                pages: {
                    ...state.pages, [action.payload.pageNumber]: action.payload.pagePosts
                }
            }
        case "LOADED_PAGES_CLEAR":
            return {
                ...state,
                pages: defaultLoadedPages
            }
        default:
            return state
    }
}

export const totalPagesReducer = (state = defaultTotalPages, action) => {
    switch (action.type) {
        case "SET_NEWS_TOTAL_PAGES":
            return {
                ...state,
                totalPages: action.payload
            }
        default:
            return state
    }
}

// Данный блок здесь больше не нужет. Эти теперь занимается хранилище

// эта штуковина каким-то образом еще и как пространство имен себя ведет
//const newsReduser = combineReducers({
//    newsPerPage: newsPerPageReducer,
//    newsPage: newsPageReducer,
//    newsLoader: pagesLoadedReducer,
//    newsTotalPages: totalPagesReducer
//})
//
//export default newsReduser;