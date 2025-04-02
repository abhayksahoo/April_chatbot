# April Chatbot

This project is a chatbot application designed to assist users with various tasks. It is built using modern programming techniques and tools.

## Features

- Interactive chatbot functionality
- Easy-to-use interface
- Extensible and customizable

## Getting Started

### Prerequisites
- Node.js installed on your system
- A Hugging Face API key

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd April_chatbot
   ```

2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your Hugging Face API key:
   ```properties
   HUGGINGFACE_API_KEY=your_generated_api_key
   HUGGINGFACE_MODEL=microsoft/DialoGPT-medium
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

5. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

6. Start the frontend:
   ```bash
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`.

## Troubleshooting

### Backend Issues
1. **Backend not starting**:
   - Ensure you have created a `.env` file in the `backend` directory with the correct Hugging Face API key and model.
   - Check for missing dependencies by running `npm install` in the `backend` directory.

2. **Error communicating with Hugging Face API**:
   - Verify that your Hugging Face API key is valid.
   - Ensure the model specified in the `.env` file is correct and available.

### Frontend Issues
1. **Frontend not connecting to backend**:
   - Ensure the backend is running on `http://localhost:5000`.
   - Verify that the `REACT_APP_BACKEND_URL` in the frontend `.env` file is set to `http://localhost:5000`.
   - Restart the frontend server after making changes to the `.env` file.

2. **UI not updating after sending a message**:
   - Check the browser console for errors.
   - Ensure the backend is returning a valid response.

## License

This project is licensed under the MIT License.
