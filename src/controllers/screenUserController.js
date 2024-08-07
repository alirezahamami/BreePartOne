const axios = require('axios');
const { extractFields } = require('../utils/extractFields'); // Import the helper function
const API_KEY = process.env.API_KEY;
const PUBLIC_API_URL = 'https://api.ofac-api.com/v4/screen';
const MIN_SCORE = 95;

const screenUser = async (req, res) => {
    try {
        const { fullName, dob, country } = req.body;
        if (!fullName || !dob || !country) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const screenCheckRequest = {
            apiKey: API_KEY,
            minScore: MIN_SCORE,
            sources: ["SDN", "NONSDN", "eu"],
            cases: [{
                name: fullName,
                dob: dob,
                citizenship: country,
                address: {
                    country: country
                }
            }]
        };

        let response;
        try {
            response = await axios.post(PUBLIC_API_URL, screenCheckRequest, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000 // Set a timeout for the request
            });
        } catch (apiError) {
            console.error('API request error:', apiError.message);
            return res.status(502).json({ error: 'Bad Gateway - External API Error' });
        }

        const results = response.data.results[0];
        if (!results) {
            return res.status(500).json({ error: 'Unexpected API Response Format' });
        }

        const matchCount = results.matchCount;

        if (matchCount > 0) {
            const ResultArray = results.matches;
            const result = extractFields(ResultArray);
            res.status(200).json({ message: 'Hit', result });
        } else {
            res.status(200).json({ message: 'Clear' });
        }
    } catch (error) {
        console.error('Internal Server Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { screenUser };
