
// In-memory chat history
const chatHistory = [];

// Add a new chat to the history
function addChat(message, reply) {
    chatHistory.push({ message, reply });
}

// Get the last chat
function getLastChat() {
    return chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;
}

// Get the full chat history
function getFullHistory() {
    return chatHistory;
}

module.exports = { addChat, getLastChat, getFullHistory };
