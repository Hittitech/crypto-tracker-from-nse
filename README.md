## Stock Price Tracker

This project is a stock price tracker that displays live stock prices and detailed information about selected stocks. The application uses React for the frontend, Redux for state management, and Chart.js for data visualization. Stock data is fetched from the Yahoo Finance API via RapidAPI.

### Assumptions

1. The user has Node.js and npm installed on their machine.
2. The user has a RapidAPI account to obtain an API key for the Yahoo Finance API.(https://rapidapi.com/apidojo/api/yahoo-finance1/)

### Libraries Used

- React
- Redux
- React Redux
- Redux Thunk
- React Router DOM
- Axios
- Chart.js
- React Chart.js 2
- RapidAPI's Yahoo Finance API


first clone this repo with git clone  git@github.com:Hittitech/crypto-tracker-from-nse.git
cd into it
run npm install
now run npm start

if data isnt coming or limit is over you can use your own api key in src/redux/actions/stockActions.js


lazy loading is also implemented ,scroll down to 20th row and scroll and wait lazy loading ll fetch next data 

can see the detail of each stock and company by clicking on the name of the stock on the home page

didnt found any api providing realtime todays data in a free subscription to show graph of it thats why used yearly data(even if can get daily data logic ll be same so thought to implement graph with what i was accessible to :)


have a great day

