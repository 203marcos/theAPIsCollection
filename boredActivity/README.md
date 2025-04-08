# Bored Activity API

This project is a simple application that generates random activities or filtered activities based on type and number of participants. It uses the Bored API to fetch the data.

## Features

-   Generate random activities.
-   Filter activities by type (e.g., education, recreational, social, etc.).
-   Filter activities by the number of participants.

## Setup

1. Make sure you have Node.js installed.

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    node server.js
    ```

4. Access the application in your browser at:
   [http://localhost:3001](http://localhost:3001)

## Endpoints

### `GET /activity`

Fetches a random or filtered activity.

#### Query Parameters

-   `type` (optional): The type of activity to filter by. Choices:
    -   `education`
    -   `recreational`
    -   `social`
    -   `charity`
    -   `cooking`
    -   `relaxation`
    -   `busywork`
-   `participants` (optional): The number of participants to filter by. Choices: `1`, `2`, `3`, `4`, `5`, `6`, `8`.

#### Example Request

```http
GET /activity?type=social&participants=2
```

#### Example Response

```json
{
    "activity": "Learn Express.js",
    "type": "education",
    "participants": 1,
    "price": 0.1,
    "duration": "hours",
    "kidFriendly": true,
    "accessibility": "Few to no challenges",
    "link": "https://expressjs.com/"
}
```

## Project Structure

-   `index.html`: A simple interface to display activity data.
-   `index.js`: Client-side code to fetch and display activity data.
-   `server.js`: Node.js server that makes requests to the Bored API.

## Contributing

Feel free to open issues or submit pull requests for improvements.
