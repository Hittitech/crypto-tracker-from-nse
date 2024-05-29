import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStockPrices,
  fetchMoreStockPrices,
} from "../redux/actions/stockActions.js";
import { Link } from "react-router-dom";
import "./stocklist.css";
import Loading from "./Loading.js";

const StockList = () => {
  const dispatch = useDispatch();
  const stockPrices = useSelector((state) => state.stocks.stockPrices);
  const loading = useSelector((state) => state.stocks.loading);

  useEffect(() => {
    dispatch(fetchStockPrices());
  }, [dispatch]);

  const loadMoreStocks = useCallback(() => {
    if (stockPrices.length < 100) {
      dispatch(fetchMoreStockPrices(stockPrices.length));
    }
  }, [dispatch, stockPrices.length]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    loadMoreStocks();
  }, [loadMoreStocks]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="container">
      <h1 className="heading">Live Stock Prices</h1>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Company Name</th>
            <th>Stock Price</th>
          </tr>
        </thead>
        <tbody>
          {stockPrices.map((stock, index) => (
            <tr key={stock.symbol}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/stocks/${stock.symbol}`} className="stock-link">
                  {stock.longName || stock.symbol}
                </Link>
              </td>
              <td>₹{stock.regularMarketPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <Loading />}
    </div>
  );
};

export default StockList;
