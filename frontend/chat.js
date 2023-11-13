document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('send-button').addEventListener('click', sendMessage);
    document.getElementById('ai-key-button').addEventListener('click', useUserAIAssistant);
});

function sendMessage() {
    const message = document.getElementById('chat-input').value;
    const apiKey = localStorage.getItem('userOpenAIKey'); // Retrieve user's API key if stored

    if (message) {
        fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, api_key: apiKey })
        })
        .then(response => response.json())
        .then(data => {
            displayMessage('You', message);
            displayMessage('AI Seller', data.response);
        })
        .catch(error => console.error('Error:', error));

        document.getElementById('chat-input').value = ''; // Clear input field
    }
}


function displayMessage(sender, message) {
    const chatWindow = document.getElementById('chat-window');
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatWindow.appendChild(messageDiv);
}

function useUserAIAssistant() {
    const apiKey = document.getElementById('ai-key').value;
    if (apiKey) {
        // Here we would store the API key and use it for subsequent chat messages
        alert('AI Assistant Activated'); // Placeholder action
    }
}
