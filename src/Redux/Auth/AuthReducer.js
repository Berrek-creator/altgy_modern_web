// Хранилище в хранилище
const defaultBearerToken = {
    bearerToken: sessionStorage.getItem('bearerToken'),
    is_auth: sessionStorage.getItem('is_auth')
}

const AuthBearerReducer = (state = defaultBearerToken, action) => {
    if (action.type === 'SET_BEARER_TOKEN') {
        sessionStorage.setItem('bearerToken', action.payload)
        sessionStorage.setItem('is_auth', true)
        return {
            ...state,
            bearerToken: action.payload,
            is_auth: true
        }
    }
    if (action.type === 'INVALIDATE_BEARER_TOKEN') {
        sessionStorage.removeItem('bearerToken')
        sessionStorage.removeItem('is_auth')
        return {
            ...state,
            bearerToken: '',
            is_auth: false
        }
    }
    return state
}

export default AuthBearerReducer