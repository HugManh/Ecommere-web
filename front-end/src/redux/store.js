import { createStore } from "redux";
import reducers from "./reducers/index";
// import { thunk } from "react-thunk";

// const middleware = [thunk];
const store = createStore(
  reducers,
  // compose(applyMiddleware(...middleware)),
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
