import axios from 'axios'; 
import { Request, Response } from 'express'; 
import { extractFields } from '../utils/extractFields';

const API_KEY = process.env.API_KEY as string; // Get API key from environment variables
const OFAC_API_URL = 'https://api.ofac-api.com/v4/screen'; 
const MIN_SCORE = 95; // Define minimum score for matches
const sources = ["SDN", "NONSDN", "eu"]; // Define sources for screening
const timeout = 5000; // Set a timeout for the request

interface ScreenCheckRequest {
    apiKey: string;
    minScore: number;
    sources: string[];
    cases: {
        name: string;
        dob: string;
        citizenship: string;
        address: {
            country: string;
        };
    }[];
}

interface APIResponse {
    data: {
        results: {
            matchCount: number;
            matches: any[]; // Adjust the type based on the actual structure of the matches
        }[];
    };
}

const getScreenUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, dob, country } = req.body;
        if (!fullName || !dob || !country) { // Check for missing required fields
            res.status(400).json({ error: 'Missing required fields' }); // Return error if missing
            return;
        }

        const screenCheckRequest: ScreenCheckRequest = {
            apiKey: API_KEY, 
            minScore: MIN_SCORE, 
            sources: sources, 
            cases: [{
                name: fullName, 
                dob: dob, 
                citizenship: country, 
                address: {
                    country: country 
                }
            }]
        };

        let response: APIResponse;
        try {
            response = await axios.post(OFAC_API_URL, screenCheckRequest, {
                headers: { 'Content-Type': 'application/json' }, 
                timeout: timeout 
            });
        } catch (apiError: any) {
            console.error('API request error:', apiError.message); 
            res.status(502).json({ error: 'Bad Gateway - External API Error' }); 
            return;
        }

        const results = response.data.results[0];
        if (!results) { 
            res.status(500).json({ error: 'Unexpected API Response Format' });
            return;
        }

        const matchCount = results.matchCount;

        if (matchCount > 0) { // If there are matches
            const ResultArray = results.matches;
            const result = extractFields(ResultArray); 
            res.status(200).json({ message: 'Hit', result }); 
        } else {
            res.status(200).json({ message: 'Clear' }); 
        }
    } catch (error: any) {
        console.error('Internal Server Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { getScreenUser };
