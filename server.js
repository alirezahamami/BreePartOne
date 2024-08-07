require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();

const PORT = 3000;
const API_URL = 'https://api.ofac-api.com/v4/screen';
const MIN_SCORE = 95;
const API_KEY = process.env.API_KEY;

app.use(express.static(__dirname + "/Bree-Tech-FronEnd-P1/dist"));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const screenUser = async (req, res) => {
    try {
        const { fullName, dob, country } = req.body;

        if (!fullName || !dob || !country) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log(fullName, dob, country);

        const screeningRequest = {
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

        const response = await axios.post(API_URL, screeningRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const matchCount = response.data.results[0].matchCount;

        if (matchCount > 0) {
            res.status(200).json({ message: 'Hit' });
        } else {
            res.status(200).json({ message: 'Clear' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

app.post('/api/SSA', screenUser);
