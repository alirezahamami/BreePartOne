import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, '..', 'Bree-Tech-FrontEnd-P1', 'dist')));

app.use(express.json());
app.use(cors());

// Routes
import apiRoutes from './routes/apiRoutes';
app.use('/api', apiRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
