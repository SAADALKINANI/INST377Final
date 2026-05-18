# INST377Final

Title: Currency Exchange Tracker


Description:
Currency Exchange Tracker is a full-stack web application that allows users to convert currencies in real time, visualize historical exchange rate trends over custom date ranges, and save frequently used currency pairs as favorites. It is backed by a live external exchange rate API and a Supabase database for persistent storage.


Target Browsers: This application is designed for desktop browsers 

## Link to Developer Manual
[Developer Manual](#developer-manual)

# Developer Manual
This manual is written for future developers taking over the Currency Exchange Tracker project. It assumes you are comfortable with JavaScript, Node.js, and web application concepts, but have not worked on this codebase before.

## 1. Installing the Application and Dependencies
 
### Prerequisites
 
Make sure you have the following installed:
 
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [Supabase](https://supabase.com/) account with a project and a `favorites` table
### Clone and Install
 
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
```
 
### Environment Variables
 
Create a `.env` file in the root of the project:
 
```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-public-key
```
 
You can find both values in your Supabase project under **Settings → API**.
 
### Supabase Table Setup
 
In your Supabase project, create a table called `favorites` with the following columns:
 
| Column Name     | Type    | Notes                        |
|-----------------|---------|------------------------------|
| id              | int8    | Primary key, auto-increment  |
| base_currency   | text    | e.g. "USD"                   |
| target_currency | text    | e.g. "EUR"                   |
 
If Row Level Security (RLS) is enabled, either disable it for this table or add policies that allow `SELECT`, `INSERT`, and `DELETE` for the anon role.
 
---
 
## 2. Running the Application on a Server
 
### Local Development
 
```bash
npm start
```
 
This runs `node server.js`. The server will start on `http://localhost:3000` by default.
 
Open your browser and go to `http://localhost:3000/index.html`.
 
## 3. Running Tests
 
There are currently **no automated tests** written for this project. This is a known gap (see Road Map below).
 
To manually test the API endpoints, you can use a tool like [Postman](https://www.postman.com/) or curl:
 
```bash
# Test currency conversion
curl "http://localhost:3000/api/convert?base=USD&target=EUR&amount=100"
 
# Test historical rates
curl "http://localhost:3000/api/history?base=USD&target=EUR&from=2024-01-01&to=2024-01-31"
 
# Test fetching favorites
curl "http://localhost:3000/api/favorites"
 
# Test saving a favorite
curl -X POST http://localhost:3000/api/favorites \
  -H "Content-Type: application/json" \
  -d '{"base_currency":"USD","target_currency":"EUR"}'
 
# Test deleting a favorite (replace 1 with a real id)
curl -X DELETE http://localhost:3000/api/favorites/1
```
 
---

 ## 4. Server API Reference
 
 
### `GET /api/convert`
Converts an amount from one currency to another using the live Frankfurter API.
### `GET /api/history`
Returns historical exchange rates between two currencies over a date range.
### `GET /api/favorites`
Retrieves all saved currency pairs from the Supabase database.
### `POST /api/favorites`
Saves a new currency pair to the Supabase database.
### `DELETE /api/favorites/:id`
Deletes a saved currency pair by its ID.


---

## 5. Expectation and Road Map
As of currently, this project has not encountered significant bug yet, however, a lot more features could also be added for better applications and user experience. Here are a list of what I can think of for now: 
- **Add input validation**: Validate all query parameters and request bodies on the backend before processing.
- **Improve UI/UX styling**: Refactor and polish the frontend design for a better user experience. In addition, Refactor `styles.css` to support mobile viewports using media queries.
- **Add more currencies**: Expand the currency dropdowns beyond the current 4 options (USD, EUR, GBP, JPY) to support the full list of currencies available from Frankfurter.
 
