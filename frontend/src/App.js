import React from 'react';
import './App.css';
import { SimulationProvider } from './context/SimulationContext';
import SimulationEnvironment from './components/SimulationEnvironment';
import AgentList from './components/AgentList';

function App() {
  return (
    <SimulationProvider>
      <div className="App">
        <div className="agent-list-container">
          <AgentList />
        </div>
        <div className="simulation-env-container">
          <SimulationEnvironment />
        </div>
      </div>
    </SimulationProvider>
  );
}

export default App;
