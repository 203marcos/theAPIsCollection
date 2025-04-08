# UV Index Checker

This project is a simple application that checks the UV index based on the provided location. It uses the OpenUV API to fetch the data.

## Setup

1. Make sure you have Node.js installed.

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file with your OpenUV API key:

    ```env
    OPENUV_API_KEY=your_api_key_here
    ```

4. Start the server:

    ```bash
    npm start
    ```

5. Access the application in your browser:
   [http://localhost:3000](http://localhost:3000)

## Endpoints

### `GET /uv?lat={latitude}&lng={longitude}`

Returns the UV index for the provided coordinates.

#### Example Response

```json
{
    "uv": 5.6377,
    "uv_max": 12.5159,
    "ozone": 290.1,
    "safe_exposure_time": {
        "st1": 66,
        "st2": 79,
        "st3": 106,
        "st4": 132,
        "st5": 212,
        "st6": 397
    }
}
```

## Project Structure

-   `index.html` A simple interface to display UV data.
-   `index.js` Client-side code to fetch location and display UV data.
-   `server.js` Node.js server that makes requests to the OpenUV API.
-   `.env` File to store the OpenUV API key.

## Contributing

Feel free to open issues or submit pull requests for improvements.
