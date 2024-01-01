import { isVisible } from '@testing-library/user-event/dist/utils';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./App.sass";
import { CandlesGenerator } from './components/Chart/CandlesGenerator/CandlesGenerator';
import Chart from './components/Chart/Chart';
import Logo from './components/Logo/Logo';
import MoonTextGenerator from './components/MoonTextGenerator/MoonTextGenerator';
import { setHistory, setToDeafulState } from './reduxStorage/candles/candles';
import { RootReducer } from './reduxStorage/configureStore';
import { setVisibility } from './reduxStorage/visibility/visibility';

function App() {
  const candles = useSelector((storage: RootReducer) => storage.candles.history);
  const dispatch = useDispatch();
  const isDocumentVisible = useSelector((storage: RootReducer) => storage.visibility.isVisibile);

  useEffect(() => {
    const func = (event: any) => {
      if (document.visibilityState == "visible") {
        dispatch(setVisibility(true))
      } else {
        dispatch(setVisibility(false))
        dispatch(setToDeafulState());
      }
    }
    document.addEventListener("visibilitychange", func);
    return () => document.removeEventListener("visibilitychange", func)
  }, [])

  return (
    <div className="App">
        {isDocumentVisible ? <MoonTextGenerator /> : null}
        {isDocumentVisible ? <Chart /> : null}
        <Logo />
        {candles !== null && isDocumentVisible ? <CandlesGenerator candles={candles} />: null}
    </div>
  );
}

export default App;
