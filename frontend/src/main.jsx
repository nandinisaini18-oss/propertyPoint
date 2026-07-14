// import { createRoot } from 'react-dom/client'
// import App from './app/App'
// import { store } from './app/app.store'
// import { Provider } from 'react-redux'

// createRoot(document.getElementById('root')).render(
//     <Provider store={store}>
//         <App />
//     </Provider>
// )

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./app/App";
import { store } from "./app/app.store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <App />
  </Provider>
);