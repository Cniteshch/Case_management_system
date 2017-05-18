import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducers";


// using middleware thunk & promise for asynchronous api requests

const middleware = composeWithDevTools(applyMiddleware(promise(), thunk));

export default createStore(rootReducer, middleware);
