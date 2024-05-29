import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockDetails } from "../redux/actions/stockActions";
import "./stockdetail.css";
import Loading from "./Loading";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockDetails = () => {
  const { symbol } = useParams();
  const dispatch = useDispatch();
  const stockDetails = useSelector(
    (state) => state.stocks.stockDetails[symbol]
  );
  // eslint-disable-next-line
  const [formattedDate, setFormattedDate] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    dispatch(fetchStockDetails(symbol));
  }, [dispatch, symbol]);

  useEffect(() => {
    if (stockDetails) {
      const date = new Date(stockDetails.index * 1000).toLocaleString();
      setFormattedDate(date);

      const financialData =
        stockDetails.earnings?.financialsChart?.yearly || [];

      setChartData({
        labels: financialData.map((data) => data.date),
        datasets: [
          {
            label: "Revenue",
            data: financialData.map((data) => data.revenue.raw),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
          {
            label: "Earnings",
            data: financialData.map((data) => data.earnings.raw),
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
          },
        ],
      });
    }
  }, [stockDetails]);

  if (!stockDetails) return <Loading />;

  const {
    regularMarketPrice,
    regularMarketVolume,
    regularMarketChange,
    regularMarketChangePercent,
  } = stockDetails.price;

  const {
    enterpriseToRevenue,
    beta,
    profitMargins,
    forwardPE,
    trailingEps,
    bookValue,
    priceToBook,
    sharesOutstanding,
  } = stockDetails.defaultKeyStatistics;

  const {
    industryDisp,
    sector,
    fullTimeEmployees,
    longBusinessSummary,
    city,
    country,
    website,
    phone,
  } = stockDetails.summaryProfile;

  return (
    <div className="container">
      <h1 className="heading">Stock Details for {symbol}</h1>
      {chartData && (
        <div className="chart-container">
          <h2>Yearly Financial Analysis</h2>
          <Line data={chartData} />
        </div>
      )}
      <div className="details-container">
        <div className="details-section">
          <h2>Price Details</h2>
          <p>Regular Market Price: ₹{regularMarketPrice?.raw}</p>
          <p>Regular Market Volume: {regularMarketVolume?.fmt}</p>
          <p>Regular Market Change: ₹{regularMarketChange?.raw}</p>
          <p>
            Regular Market Change Percent: {regularMarketChangePercent?.fmt}
          </p>
        </div>
        <div className="details-section">
          <h2>Key Statistics</h2>
          <div className="key-statistics-container">
            <div className="key-statistics-section">
              <p>Enterprise to Revenue Ratio: {enterpriseToRevenue?.fmt}</p>
              <p>Beta: {beta?.fmt}</p>
              <p>Profit Margins: {profitMargins?.fmt}</p>
              <p>Forward PE Ratio: {forwardPE?.fmt}</p>
            </div>
            <div className="key-statistics-section">
              <p>Trailing EPS: {trailingEps?.fmt}</p>
              <p>Book Value: {bookValue?.fmt}</p>
              <p>Price to Book Ratio: {priceToBook?.fmt}</p>
              <p>Shares Outstanding: {sharesOutstanding?.fmt}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="company-details-section">
        <h2>Company Details</h2>
        <p>Industry: {industryDisp}</p>
        <p>Sector: {sector}</p>
        <p>Full-Time Employees: {fullTimeEmployees}</p>
        <p>City: {city}</p>
        <p>Country: {country}</p>
        <p>
          Website:{" "}
          <a href={website} className="link">
            {website}
          </a>
        </p>
        <p>Phone: {phone}</p>
        <p>Business Summary: {longBusinessSummary}</p>
      </div>
    </div>
  );
};

export default StockDetails;
