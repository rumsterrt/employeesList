import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import initStore from 'store'
import { BrowserRouter } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'

const store = initStore()

const Root = () => (
    <Provider store={store}>
        <BrowserRouter>
            <CssBaseline />
            <Routes />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(<Root />, document.querySelector('#root'))
