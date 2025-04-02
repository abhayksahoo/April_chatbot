# Backend for April Chatbot

This is the backend for the April Chatbot application.

## API Endpoints

### POST `/api/chat`
- **Description**: Sends a message to the chatbot and receives a reply.
- **Request Body**:
  ```json
  {
    "message": "Hello, how are you?"
  }
  ```
- **Response**:
  ```json
  {
    "reply": "I'm good, thank you!"
  }
  ```

## Environment Variables
- `HUGGINGFACE_API_KEY`: Your Hugging Face API key.
- `HUGGINGFACE_MODEL`: The model to use (e.g., `microsoft/DialoGPT-medium`).

## Running the Server
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
