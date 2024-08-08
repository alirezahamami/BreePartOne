const axios = require('axios'); // Import axios for HTTP requests
const { extractFields } = require('../utils/extractFields'); // Import the helper function
const API_KEY = process.env.API_KEY; // Get API key from environment variables
const OFAC_API_URL = 'https://api.ofac-api.com/v4/screen'; // Set OFAC API endpoint URL
const MIN_SCORE = 95; // Define minimum score for matches
const sources = ["SDN", "NONSDN", "eu"]; // Define sources for screening
const timeout = 5000; // Set a timeout for the request

const getScreenUser = async (req, res) => {
    try {
        const { fullName, dob, country } = req.body;
        if (!fullName || !dob || !country) { // Check for missing required fields
            return res.status(400).json({ error: 'Missing required fields' }); // Return error if missing
        }

        const screenCheckRequest = {
            apiKey: API_KEY, // Include API key in request
            minScore: MIN_SCORE, // Include minimum score in request
            sources: sources, // Include sources in request
            cases: [{
                name: fullName, // Include user's full name
                dob: dob, // Include user's date of birth
                citizenship: country, // Include user's citizenship
                address: {
                    country: country // Include user's country of address
                }
            }]
        };

        let response;
        try {
            response = await axios.post(OFAC_API_URL, screenCheckRequest, {
                headers: { 'Content-Type': 'application/json' }, // Set request headers
                timeout: timeout // Set request timeout
            });
        } catch (apiError) {
            console.error('API request error:', apiError.message); // Log API error
            return res.status(502).json({ error: 'Bad Gateway - External API Error' }); // Return API error
        }

        const results = response.data.results[0];
        if (!results) { // Check if results are missing
            return res.status(500).json({ error: 'Unexpected API Response Format' }); // Return error if missing
        }

        const matchCount = results.matchCount;

        if (matchCount > 0) { // If there are matches
            const ResultArray = results.matches;
            const result = extractFields(ResultArray); // Extract relevant fields from matches
            res.status(200).json({ message: 'Hit', result }); // Return matches
        } else {
            res.status(200).json({ message: 'Clear' }); // Return clear if no matches
        }
    } catch (error) {
        console.error('Internal Server Error:', error.message); // Log internal server error
        res.status(500).json({ error: 'Internal Server Error' }); // Return internal server error
    }
};

module.exports = { getScreenUser }; 
