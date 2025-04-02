const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

if (!process.env.HUGGINGFACE_API_KEY || !process.env.HUGGINGFACE_MODEL) {
  console.error('Missing Hugging Face API key or model in environment variables.');
  process.exit(1); // Exit the server if critical environment variables are missing
}

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

async function fetchHuggingFaceResponse(message) {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${process.env.HUGGINGFACE_MODEL}`,
        { inputs: message },
        { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
      );
      return response.data;
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} failed:`, error.response?.status || error.message);
      if (attempt >= maxRetries || error.response?.status !== 503) {
        throw error; // Rethrow if max retries reached or error is not 503
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
    }
  }
}

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message format' });
  }

  try {
    const response = await fetchHuggingFaceResponse(message);

    console.log('Hugging Face API response:', response); // Log the full response

    if (Array.isArray(response) && response[0]?.generated_text) {
      // Extract the generated_text from the first object in the array
      res.json({ reply: response[0].generated_text });
    } else if (response && response.error) {
      console.error('Hugging Face API error:', response.error);
      res.json({ reply: "The chatbot encountered an error. Please try again later." });
    } else {
      console.warn('Unexpected response structure:', response);
      res.json({ reply: "I'm sorry, I couldn't process your message." }); // Fallback reply
    }
  } catch (error) {
    console.error('Error communicating with Hugging Face API:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Error communicating with Hugging Face API',
      details: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
