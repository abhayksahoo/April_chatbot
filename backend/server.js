const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${process.env.HUGGINGFACE_MODEL}`,
            { inputs: message },
            { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
        );
        res.json({ reply: response.data });
    } catch (error) {
        console.error('Error communicating with Hugging Face API:', error.response?.data || error.message);
        res.status(500).json({ error: 'Error communicating with Hugging Face API', details: error.response?.data || error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
