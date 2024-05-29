import axios from "axios";
import {
  setStockPrices,
  addStockPrices,
  setStockDetails,
} from "../reducers/stockReducer";

const API_KEY = "8d2a8c7ffbmsha034a5b61cbf69bp1df2ecjsn6a6813a55152";

const API_URL = "https://apidojo-yahoo-finance-v1.p.rapidapi.com";
const API_HEADERS = {
  "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
  "x-rapidapi-key":
    API_KEY || "8d2a8c7ffbmsha034a5b61cbf69bp1df2ecjsn6a6813a55152",
};

const NSE_SYMBOLS = [
  "RELIANCE.NS",
  "TCS.NS",
  "HDFCBANK.NS",
  "INFY.NS",
  "ITC.NS",
  "HDFC.NS",
  "KOTAKBANK.NS",
  "ICICIBANK.NS",
  "LT.NS",
  "SBIN.NS",
  "BHARTIARTL.NS",
  "ASIANPAINT.NS",
  "HINDUNILVR.NS",
  "AXISBANK.NS",
  "MARUTI.NS",
  "M&M.NS",
  "SUNPHARMA.NS",
  "TITAN.NS",
  "ULTRACEMCO.NS",
  "BAJFINANCE.NS",
  "ADANIPORTS.NS",
  "BAJAJ-AUTO.NS",
  "BAJAJFINSV.NS",
  "BAJAJHLDNG.NS",
  "BPCL.NS",
  "BRITANNIA.NS",
  "CIPLA.NS",
  "COALINDIA.NS",
  "DIVISLAB.NS",
  "DRREDDY.NS",
  "EICHERMOT.NS",
  "GRASIM.NS",
  "HCLTECH.NS",
  "HDFCLIFE.NS",
  "HEROMOTOCO.NS",
  "HINDALCO.NS",
  "HINDPETRO.NS",
  "IBULHSGFIN.NS",
  "INDUSINDBK.NS",
  "IOC.NS",
  "JSWSTEEL.NS",
  "L_T.NS",
  "NESTLEIND.NS",
  "NTPC.NS",
  "ONGC.NS",
  "POWERGRID.NS",
  "SHREECEM.NS",
  "TATAMOTORS.NS",
  "TATASTEEL.NS",
  "TECHM.NS",
];

export const fetchStockPrices = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/market/v2/get-quotes`, {
      headers: API_HEADERS,
      params: { region: "IN", symbols: NSE_SYMBOLS.slice(0, 20).join(",") },
    });
    console.log(response.data);
    dispatch(setStockPrices(response.data.quoteResponse.result));
  } catch (error) {
    console.error("Error fetching stock prices:", error);
  }
};

export const fetchMoreStockPrices = (startIndex) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/market/v2/get-quotes`, {
      headers: API_HEADERS,
      params: {
        region: "IN",
        symbols: NSE_SYMBOLS.slice(startIndex, startIndex + 20).join(","),
      },
    });
    dispatch(addStockPrices(response.data.quoteResponse.result));
  } catch (error) {
    console.error("Error fetching more stock prices:", error);
  }
};

export const fetchStockDetails = (symbol) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/stock/v2/get-summary`, {
      headers: API_HEADERS,
      params: { symbol, region: "IN" },
    });
    console.log(response.data); // Log the response data
    dispatch(setStockDetails({ symbol, data: response.data }));
  } catch (error) {
    console.error("Error fetching stock details:", error);
  }
};
