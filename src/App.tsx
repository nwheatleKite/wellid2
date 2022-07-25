import React from 'react';
import './App.css';
import './baseCSS.css';
import Wells from "./components/Wells"


function App() {
  return (
    <div className="App">
      {/* {isMultiPlates ?
        <PlateWells /> : <Wells />} */}
      <Wells />
    </div>
  );
}

export default App;