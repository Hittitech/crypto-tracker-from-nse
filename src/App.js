import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import StockList from "./components/StockList";
import StockDetail from "./components/StockDetail";

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<StockList />} />
        <Route path="/stocks/:symbol" element={<StockDetail />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
