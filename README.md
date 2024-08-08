# Overview
This is an example project for Bree Technologies, showcasing the OFAC SDN List Screening Application. This project is a simple, scalable full-stack web application that screens customers against several key sanction lists. The application allows users to input a person's full name, birth year, and country, and checks if the person matches any entries in the following lists:

- **OFAC SDN (Specially Designated Nationals) List**
- **OFAC Consolidated (non-SDN) List**
- **EU Financial Sanctions Files (FSF)**

## Features

- **User-friendly Form:** A clean and responsive form for entering customer details, ensuring all fields (Full Name, Birth Year, Country) are required before submission.
- **Real-time Screening:** Upon submission, the application queries multiple sanction lists, including the OFAC SDN List, OFAC Consolidated (non-SDN) List, and the EU Financial Sanctions Files (FSF), to determine if the customer is a match.
- **Detailed Results:** The result is displayed as either `Hit` or `Clear`. If there is a match, it specifies which of the provided details (Name, Date of Birth, Country) triggered the match, along with the specific list where the match was found.

## Technologies Used

### Frontend:
- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: For styling the form with modern, responsive, and scalable CSS.
- **Axios**: For handling API requests from the frontend.

### Backend:
- **Node.js**: JavaScript runtime for building the backend API.
- **Express.js**: Web framework for Node.js, used to handle routing and API endpoints.
- **Axios**: Used in the backend to perform HTTP requests, such as querying the sanction lists.
- **OFAC API**: Used to query the OFAC SDN List, OFAC Consolidated (non-SDN) List, and EU Financial Sanctions Files (FSF) to match customer details.


## Dependencies

### Backend

The following dependencies are used in the backend of the application:

- **@mui/styles**: `^5.15.18` - MUI styles for consistent UI components.
- **axios**: `^1.7.3` - For making HTTP requests.
- **cors**: `^2.8.5` - To enable Cross-Origin Resource Sharing (CORS).
- **dotenv**: `^16.4.5` - For managing environment variables.
- **express**: `^4.18.2` - Web framework for building the backend API.
- **vite**: `^5.3.4` - A build tool that provides a fast development environment.

#### DevDependencies

- **concurrently**: `^8.2.2` - To run multiple commands concurrently.
- **nodemon**: `^3.1.0` - Automatically restarts the server on code changes.

### Frontend

The following dependencies are used in the frontend of the application:

- **autoprefixer**: `^10.4.20` - Adds vendor prefixes to CSS rules.
- **axios**: `^1.7.3` - For making HTTP requests.
- **postcss**: `^8.4.41` - A tool for transforming CSS with JavaScript plugins.
- **react**: `^18.3.1` - A JavaScript library for building user interfaces.
- **react-dom**: `^18.3.1` - For working with React in the browser.
- **react-select-country-list**: `^2.2.3` - A country list selector for React.
- **react-datepicker**: `^7.3.0` - A date picker component for React, allowing users to select dates from a calendar interface.

#### DevDependencies

- **@types/node**: `^22.1.0` - TypeScript type definitions for Node.js.
- **@types/react**: `^18.3.3` - TypeScript type definitions for React.
- **@types/react-dom**: `^18.3.0` - TypeScript type definitions for ReactDOM.
- **@vitejs/plugin-react**: `^4.3.1` - Vite plugin for React.
- **eslint**: `^8.57.0` - Linter for identifying and fixing code quality issues.
- **eslint-plugin-react**: `^7.34.3` - ESLint plugin for React-specific linting rules.
- **eslint-plugin-react-hooks**: `^4.6.2` - ESLint plugin for React hooks linting.
- **eslint-plugin-react-refresh**: `^0.4.7` - Plugin to enable fast refresh for React.
- **tailwindcss**: `^3.4.7` - A utility-first CSS framework for styling.
- **typescript**: `^5.5.4` - A typed superset of JavaScript.
- **vite**: `^5.3.4` - A build tool that provides a fast development environment.


# Deployment:
- **Render.com**: The application is deployed and accessible online at the link below. Please note that it takes 90 seconds to load due to the use of a free tier. 
https://breepartone.onrender.com/

# Installation and Setup
## Prerequisites
Ensure you have the following installed:

Node.js: v14 or later
```sh
https://nodejs.org/en/download/ 
```
to download the latest version of npm, on the command line, run the following command:
```sh
npm install -g npm
```
## Steps

Clone the repository: https://github.com/alirezahamami/BreePartOne.git
```sh
git clone https://github.com/alirezahamami/BreePartOne.git
```
## Install dependencies:
```sh
npm install
cd Bree-Tech-FrontEnd-P1 
npm install
cd ..
```
Environment Variables:
Create a .env file in the root directory with the following variables:
```sh
API_KEY= YourAPIKey
```
You can sign up for a free API key at https://www.ofac-api.com/.

Run the application:
```sh
npm start
```

Access the application:
Open your browser and navigate to http://localhost:3000.

## Usage
Enter the customer's Full Name, Birth Year, and Country in the form.
Click the Submit button.
View the result, indicating whether the customer is a Hit or Clear.

## Optimization and Scalability
- **Modular Codebase**: The application is built with a modular architecture, making it easy to scale and add new features.
- **Error Handling**: Comprehensive error handling is implemented to manage API failures and invalid user inputs.
- **Responsive Design**: The form is designed to be fully responsive, providing an optimal user experience on all devices.

## Future Enhancements
- **Caching**: Implementing caching for the SDN list to reduce API calls and improve response times.
- **Advanced Matching Algorithms**: Integrate fuzzy matching to improve the accuracy of matches against the SDN list.
- **User** Authentication: Add user authentication and role-based access control for enhanced security.

## Contributing
Feel free to fork this repository and contribute by submitting a pull request.

## License
This project was created as an exercise for Bree Technology and is licensed under the MIT License.

## Contact
For any queries or suggestions, please contact alireza.hamami@gmail.com

