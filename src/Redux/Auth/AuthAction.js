export const setBearerToken = (bearerToken = "") => {
    return {
        type: 'SET_BEARER_TOKEN',
        payload: bearerToken
    }
}