// Хранилище в хранилище
const defaultBearerToken = {
    bearerToken: sessionStorage.getItem('bearerToken')
}

const AuthBearerReducer = (state = defaultBearerToken, action) => {
    if (action.type === 'SET_BEARER_TOKEN') {
        sessionStorage.setItem('bearerToken', action.payload)
        return {
            ...state,
            bearerToken: action.payload
        }
    }
    if (action.type === 'INVALIDATE_BEARER_TOKEN') {
        sessionStorage.removeItem('bearerToken')
        return {
            ...state,
            bearerToken: ''
        }
    }
    return state
}

export default AuthBearerReducer