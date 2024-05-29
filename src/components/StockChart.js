import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockChartData } from "../redux/actions/stockAction";
import { Line } from "react-chartjs-2";

const StockChart = ({ symbol }) => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.stocks.chartData);

  useEffect(() => {
    dispatch(fetchStockChartData(symbol));
  }, [dispatch, symbol]);

  const revenueData = chartData.map((data) => {
    return { quarter: data.time, revenue: data.revenueQuarterlyGrowth.raw };
  });

  const data = {
    labels: revenueData.map((data) => data.quarter),
    datasets: [
      {
        label: "Quarterly Revenue Growth",
        data: revenueData.map((data) => data.revenue),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default StockChart;
