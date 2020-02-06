import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import initStore from 'store'
import { BrowserRouter } from 'react-router-dom'
import { saveState, loadState } from 'utils/localStorage'
import _throttle from 'lodash/throttle'

import CssBaseline from '@material-ui/core/CssBaseline'

const store = initStore(loadState())

store.subscribe(
    _throttle(() => {
        saveState(store.getState())
    }, 1000),
)

const Root = () => (
    <Provider store={store}>
        <BrowserRouter>
            <CssBaseline />
            <Routes />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(<Root />, document.querySelector('#root'))
