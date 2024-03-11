import App from '../App.jsx'

import { Provider } from 'react-redux'
import store from '../Redux/store.js'

export default function Root() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}