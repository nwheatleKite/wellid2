import React from 'react';
import './App.css';
import './baseCSS.css';
import Wells from "./components/Wells"
import PlateWells from "./components/PlateWells"
import IsMultiPlate from './components/IsMultiplate';
import { useAppSelector } from './app/hooks';

function App() {
  const isMultiPlates = useAppSelector(state => state.isMultiPlates)
  return (
    <div className="App">
      <IsMultiPlate />
      {isMultiPlates ?
        <PlateWells /> : <Wells />}
    </div>
  );
}

export default App;