const axios = require('axios');
const http = require('http');
const https = require('https');

const numberOfRequests = 10000; // Change this to the desired number of requests
const requestUrl = 'http://localhost:3000'; // Replace with your server URL
const requestMethod = 'GET'; // Change this to the desired HTTP method
const durationSeconds = 20; // Change this to the desired duration in seconds

// Create an HTTP agent with Keep-Alive support
const agent = new http.Agent({ keepAlive: true });

// For HTTPS requests, use the following:
// const agent = new https.Agent({ keepAlive: true });

const makeRequest = async () => {
  try {
    await axios({
      method: requestMethod,
      url: requestUrl,
      // You can add headers, data, etc. as needed
      httpAgent: agent, // Use the custom agent for this request
    });
    console.log('Request successful');
  } catch (error) {
    console.error('Error making request:', error.message);
  }
};

const runTest = async () => {
  const start = Date.now();

  // Run the test for the specified duration
  while (Date.now() - start < durationSeconds * 1000) {
    // Create an array of promises for concurrent requests
    const requests = Array.from({ length: numberOfRequests }, makeRequest);

    // Wait for all requests to complete before starting the next iteration
    await Promise.all(requests);
  }

  // Close the agent when done to free up resources (optional)
  agent.destroy();
};

runTest();