import React from 'react';
import "./App.sass";
import { CandlesGenerator } from './components/Chart/CandlesGenerator/CandlesGenerator';
import Chart from './components/Chart/Chart';

function App() {
  return (
    <div className="App">
        <Chart />
        <CandlesGenerator />
    </div>
  );
}

export default App;
