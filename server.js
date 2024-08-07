require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3000;

// Middleware
app.use(express.static(__dirname + "/Bree-Tech-FrontEnd-P1/dist"));
app.use(express.json());
app.use(cors());

// Routes
const apiRoutes = require('./src/routes/apiRoutes');
app.use('/api', apiRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});