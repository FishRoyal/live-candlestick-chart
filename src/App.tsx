import React from 'react';
import { useSelector } from 'react-redux';
import "./App.sass";
import { CandlesGenerator } from './components/Chart/CandlesGenerator/CandlesGenerator';
import Chart from './components/Chart/Chart';
import { RootReducer } from './reduxStorage/configureStore';

function App() {
  const candles = useSelector((storage: RootReducer) => storage.candles.history)
  return (
    <div className="App">
        <Chart />
        {candles !== null ? <CandlesGenerator candles={candles}/> : null}
    </div>
  );
}

export default App;
