import { createStore } from 'redux'
import goperApp from 'reducers/index'

const store = createStore(
  goperApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store
