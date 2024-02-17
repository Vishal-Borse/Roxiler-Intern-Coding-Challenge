# Roxiler-Backend-Coding-Challenge

## TechStack Used
- Node.js
- Express.js
- PostegreSQL

## Installation
1. In your local PostgreSQL shell, run following command to create Database:

   ```bash
   CREATE DATABASE roxiler
   ```
   
2. Clone the repository:

   ```bash
   git clone https://github.com/Vishal-Borse/Roxiler-Backend-Coding-Challenge.git
   ```

3. Navigate to the project directory:

   ```bash
   cd Roxiler-Backend-Coding-Challenge
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Create a .env file in the root directory and add the following:

   ```bash
   PGUSER=your_pg_username
   PGHOST=your_pg_host
   PGPASSWORD=your_pg_password
   PGDATABASE=roxiler
   PGPORT=your_pg_port
   PORT=your_port
   ```
   
## Run the Application

   To start the server in development mode with automatic code reloading, you can run:
   ```bash
   npm run dev
   ```

   To start the server in production mode, you can run:
   ```bash
   npm start
   ```
## API Endpoints

### Initialize Database
- **GET initialize-database**
 ```http
  GET /api/initialize-database
  ```
  - Returns: Fetch the JSON from the third party API and initialize the database with seed data.

### List Transactions
- **GET transactions**
 ```http
  GET /api/transactions?search=query&page=query
  ```
  | Query      | Type     | Description                          |
  | :----------| :------- | :----------------------------------- |
  | `search`   | `string` | **Required**. Keyword for searching. |
  | `page`     | `string` | **Required**. Page Number.           |
  
  - Returns: List of product transactions based on search criteria and pagination.
    
### Statistics
- **GET statistics**
```http
  GET /api/statistics?month=query
  ```
  | Query      | Type     | Description                          |
  | :--------- | :------- | :----------------------------------- |
  | `month`    | `string`  | **Required**                        |
  
  - Returns: Total sale amount, total number of sold items, and total number of unsold items for the selected month.

### Bar Chart
- **GET bar-chart**
```http
  GET /api/bar-chart?month=query
  ```
  | Query      | Type     | Description                          |
  | :--------- | :------- | :----------------------------------- |
  | `month`    | `string`  | **Required**                        |

  - Returns: Price range and number of items in each range for the selected month.

### Pie Chart
- **GET pie-chart**
 ```http
  GET /api/pie-chart?month=query
  ```
  | Query      | Type     | Description                          |
  | :--------- | :------- | :----------------------------------- |
  | `month`    | `string`  | **Required**                        |
  
  - Returns: Unique categories and number of items from each category for the selected month.

### Combined Response
- **GET combined**
```http
  GET /api/combined-data?month=query
  ```
  | Query      | Type     | Description                          |
  | :--------- | :------- | :----------------------------------- |
  | `month`    | `string`  | **Required**                        |
  
  - Returns: Combined response containing data from all APIs.


### 🔗 Links and Details
- Vishal Sambhaji Borse
- +917666045526
- borsev662@gmail.com
- [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vishal-borse-971241212/)
