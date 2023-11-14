import React from 'react';

function AgentDetails({ agent }) {
  return (
    <div>
      <h3>Parameters</h3>
      <p>INSTRUCTIONS</p>
      <div>{agent.instructions}</div>
      <br></br>
      {/* <p>TOOLS</p>
      <div>{agent.tools}</div> */}
      <br></br>
      <p>KNOWLEDGE</p>
      <div>{agent.file_ids}</div>
    </div>
  );
}

export default AgentDetails;
