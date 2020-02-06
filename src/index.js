import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import initStore from 'store'
import { HashRouter } from 'react-router-dom'
import { saveState, loadState } from 'utils/localStorage'
import _throttle from 'lodash/throttle'
import ModalRoot from 'components/modals'

import CssBaseline from '@material-ui/core/CssBaseline'

const store = initStore(loadState())

store.subscribe(
    _throttle(() => {
        saveState(store.getState())
    }, 1000),
)

const Root = () => (
    <Provider store={store}>
        <HashRouter basename="/">
            <CssBaseline />
            <Routes />
            <ModalRoot />
        </HashRouter>
    </Provider>
)

ReactDOM.render(<Root />, document.querySelector('#root'))
