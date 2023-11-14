import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AgentDetails from './AgentDetails';

function AgentList() {
  const [agents, setAgents] = useState({ data: [] });
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [apiKey, setApiKey] = useState('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');

  useEffect(() => {
    if (apiKey) {
      axios.get('/api/assistants', { headers: { 'Authorization': `Bearer ${apiKey}` } })
        .then(response => {
          setAgents(response.data); // Assuming this is the structure of the response
        })
        .catch(error => {
          console.error('There was an error fetching the agents:', error);
        });
    }
  }, [apiKey]);

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Enter OpenAI API Key"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
      /> */}
      <ul>
        {console.log(agents.data)}
        {agents.data.map(agent => (
          <li key={agent.id} onClick={() => setSelectedAgent(agent)}>
            {agent.name || 'Unnamed Agent'}
          </li>
        ))}
      </ul>
      {selectedAgent && <AgentDetails agent={selectedAgent} />}
    </div>
  );
}

export default AgentList;
