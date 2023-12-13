# StockHub

## Overview

Welcome to the StockHub, a web application that provides real-time data about the stock prices of various companies. This project is split into two main folders: `front` (Vue.js and TypeScript) and `back` (Node.js and TypeScript).

## Features

### Real-Time Stock Data

- View real-time stock prices of different companies.
- Access detailed information about each company, including its stock quote and website.

### User Authentication

- Create a new user account.
- Log in to an existing account.
- Secure access to certain features with user authentication.

### Favorites Management

- Add companies to your list of favorites.
- Remove companies from your favorites list.

### User Routes

For detailed documentation on available routes and functionalities, refer to the `routesDocs` file in the `back` folder.

## Project Structure

### Frontend (`front` folder)

- **Vue.js**: Frontend framework for building the user interface.
- **TypeScript**: Adds static typing to JavaScript for enhanced development.

### Backend (`back` folder)

- **Node.js**: JavaScript runtime for server-side development.
- **TypeScript**: Adds static typing to JavaScript for enhanced development.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/Zlahrouni/full-stack-stock-market.git
   ```
2. Install dependencies in the backend and frontend folders:

   ```bash
   cd back
   npm install
   cd ../front
   npm install
   ```

3. To the back:

   ```bash
   npm run dev
   ```
   
4. To the front:

   ```bash
    npm run serve
    ```
   
### Configuration
The backend uses an .env file in the back folder. You can modify the port or other configurations if needed.

## License
This project is licensed under the MIT License. For more information, please see the `License` file included in this repository.

**_Stay tuned for exciting updates!_**
