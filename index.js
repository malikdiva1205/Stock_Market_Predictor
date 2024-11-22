const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = process.env.PORT||3000;

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the directory where the template files are located
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('HomePage.ejs');
});

const apiUrl1 = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=AAPL&outputsize=compact&datatype=json`;
const options1 = {
  method: 'GET',
  url: apiUrl1, // Add the url property here
  headers: {
    'x-rapidapi-key': 'b45c9d86cfmshc11b6532db96e84p131c07jsn1c08f7341ca8',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
  }
};
app.get('/apple',async (req,res)=>{
  // Fetch data from the API
  const response = await axios.get(apiUrl1, options1);
  const stockData = response.data;
  // Extract the latest date
  const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];

  // Get the latest refreshed data
  const latestData = stockData["Time Series (Daily)"][lastRefreshed];
  // Log the result
  console.log("Last Refreshed Date:", lastRefreshed);
  console.log("Latest Data:", latestData);
  // Example: Accessing specific values
  const latestOpen = latestData["1. open"];
  const latestHigh = latestData["2. high"];
  const latestLow = latestData["3. low"];
  const latestClose = latestData["4. close"];
  const latestVolume = latestData["5. volume"];
  console.log("Open:", latestOpen);
  
  console.log("High:", latestHigh);
  console.log("Low:", latestLow);
  console.log("Close:", latestClose);
  console.log("Volume:", latestVolume);
  let predicted_close = 0;
  res.render('Apple.ejs',{latestOpen,latestHigh,latestLow,latestClose,latestVolume,predicted_close});
});

app.post('/apple_data', (req, res) => {
  const { open, high, low, volume } = req.body;

  console.log("Open Price:", open);
  console.log("High Price:", high);
  console.log("Low Price:", low);
  console.log("Volume:", volume);
  // Data to pass
const data = {
  open: open,
  high: high,
  low: low,
  volume: volume
};
// Write to JSON file
fs.writeFileSync('data_pass.json', JSON.stringify(data, null, 2), 'utf-8');
console.log("Data written to data.json");

  res.redirect('/apple');
});

const apiUrl2 = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=AMZN&outputsize=compact&datatype=json`;
const options2 = {
  method: 'GET',
  url: apiUrl2, // Add the url property here
  headers: {
    'x-rapidapi-key': 'b45c9d86cfmshc11b6532db96e84p131c07jsn1c08f7341ca8',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
  }
};
app.get('/amazon',async(req,res)=>{
  // Fetch data from the API
  const response = await axios.get(apiUrl2, options2);
  const stockData = response.data;
  // Extract the latest date
  const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];

  // Get the latest refreshed data
  const latestData = stockData["Time Series (Daily)"][lastRefreshed];
  // Log the result
  console.log("Last Refreshed Date:", lastRefreshed);
  console.log("Latest Data:", latestData);
  // Example: Accessing specific values
  const latestOpen = latestData["1. open"];
  const latestHigh = latestData["2. high"];
  const latestLow = latestData["3. low"];
  const latestClose = latestData["4. close"];
  const latestVolume = latestData["5. volume"];
  console.log("Open:", latestOpen);
  console.log("High:", latestHigh);
  console.log("Low:", latestLow);
  console.log("Close:", latestClose);
  console.log("Volume:", latestVolume);
  res.render('Amazon.ejs',{latestOpen,latestHigh,latestLow,latestClose,latestVolume});
});

app.post('/amazon_data', (req, res) => {
  const { open, high, low, volume } = req.body;

  console.log("Open Price:", open);
  console.log("High Price:", high);
  console.log("Low Price:", low);
  console.log("Volume:", volume);
  res.redirect('/amazon');
});

const apiUrl3 = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=GOOG&outputsize=compact&datatype=json`;
const options3 = {
  method: 'GET',
  url: apiUrl3, // Add the url property here
  headers: {
    'x-rapidapi-key': 'b45c9d86cfmshc11b6532db96e84p131c07jsn1c08f7341ca8',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
  }
};

app.get('/google',async(req,res)=>{
  // Fetch data from the API
  const response = await axios.get(apiUrl3, options3);
  const stockData = response.data;
  // Extract the latest date
  const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];

  // Get the latest refreshed data
  const latestData = stockData["Time Series (Daily)"][lastRefreshed];
  // Log the result
  console.log("Last Refreshed Date:", lastRefreshed);
  console.log("Latest Data:", latestData);
  // Example: Accessing specific values
  const latestOpen = latestData["1. open"];
  const latestHigh = latestData["2. high"];
  const latestLow = latestData["3. low"];
  const latestClose = latestData["4. close"];
  const latestVolume = latestData["5. volume"];
  console.log("Open:", latestOpen);
  console.log("High:", latestHigh);
  console.log("Low:", latestLow);
  console.log("Close:", latestClose);
  console.log("Volume:", latestVolume);
  res.render('Google.ejs',{latestOpen,latestHigh,latestLow,latestClose,latestVolume});
});

app.post('/google_data', (req, res) => {
  const { open, high, low, volume } = req.body;

  console.log("Open Price:", open);
  console.log("High Price:", high);
  console.log("Low Price:", low);
  console.log("Volume:", volume);
  res.redirect('/google');
});

const apiUrl4 = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=INTC&outputsize=compact&datatype=json`;
const options4 = {
  method: 'GET',
  url: apiUrl4, // Add the url property here
  headers: {
    'x-rapidapi-key': 'b45c9d86cfmshc11b6532db96e84p131c07jsn1c08f7341ca8',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
  }
};

app.get('/intel',async(req,res)=>{
  // Fetch data from the API
  const response = await axios.get(apiUrl4, options4);
  const stockData = response.data;
  // Extract the latest date
  const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];

  // Get the latest refreshed data
  const latestData = stockData["Time Series (Daily)"][lastRefreshed];
  // Log the result
  console.log("Last Refreshed Date:", lastRefreshed);
  console.log("Latest Data:", latestData);
  // Example: Accessing specific values
  const latestOpen = latestData["1. open"];
  const latestHigh = latestData["2. high"];
  const latestLow = latestData["3. low"];
  const latestClose = latestData["4. close"];
  const latestVolume = latestData["5. volume"];
  console.log("Open:", latestOpen);
  console.log("High:", latestHigh);
  console.log("Low:", latestLow);
  console.log("Close:", latestClose);
  console.log("Volume:", latestVolume);
  res.render('Intel.ejs',{latestOpen,latestHigh,latestLow,latestClose,latestVolume});
});

app.post('/intel_data', (req, res) => {
  const { open, high, low, volume } = req.body;

  console.log("Open Price:", open);
  console.log("High Price:", high);
  console.log("Low Price:", low);
  console.log("Volume:", volume);
  res.redirect('/intel');
});

const apiUrl5 = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=META&outputsize=compact&datatype=json`;
const options5 = {
  method: 'GET',
  url: apiUrl5, // Add the url property here
  headers: {
    'x-rapidapi-key': 'b45c9d86cfmshc11b6532db96e84p131c07jsn1c08f7341ca8',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
  }
};

app.get('/meta',async(req,res)=>{
  // Fetch data from the API
  const response = await axios.get(apiUrl5, options5);
  const stockData = response.data;
  // Extract the latest date
  const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];

  // Get the latest refreshed data
  const latestData = stockData["Time Series (Daily)"][lastRefreshed];
  // Log the result
  console.log("Last Refreshed Date:", lastRefreshed);
  console.log("Latest Data:", latestData);
  // Example: Accessing specific values
  const latestOpen = latestData["1. open"];
  const latestHigh = latestData["2. high"];
  const latestLow = latestData["3. low"];
  const latestClose = latestData["4. close"];
  const latestVolume = latestData["5. volume"];
  console.log("Open:", latestOpen);
  console.log("High:", latestHigh);
  console.log("Low:", latestLow);
  console.log("Close:", latestClose);
  console.log("Volume:", latestVolume);
  res.render('Meta.ejs',{latestOpen,latestHigh,latestLow,latestClose,latestVolume});
});

app.post('/meta_data', (req, res) => {
  const { open, high, low, volume } = req.body;

  console.log("Open Price:", open);
  console.log("High Price:", high);
  console.log("Low Price:", low);
  console.log("Volume:", volume);
  res.redirect('/meta');
});

const apiUrl6 = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=compact&datatype=json`;
const options6 = {
  method: 'GET',
  url: apiUrl6, // Add the url property here
  headers: {
    'x-rapidapi-key': 'b45c9d86cfmshc11b6532db96e84p131c07jsn1c08f7341ca8',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
  }
};

app.get('/microsoft',async(req,res)=>{
  // Fetch data from the API
  const response = await axios.get(apiUrl6, options6);
  const stockData = response.data;
  // Extract the latest date
  const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];

  // Get the latest refreshed data
  const latestData = stockData["Time Series (Daily)"][lastRefreshed];
  // Log the result
  console.log("Last Refreshed Date:", lastRefreshed);
  console.log("Latest Data:", latestData);
  // Example: Accessing specific values
  const latestOpen = latestData["1. open"];
  const latestHigh = latestData["2. high"];
  const latestLow = latestData["3. low"];
  const latestClose = latestData["4. close"];
  const latestVolume = latestData["5. volume"];
  console.log("Open:", latestOpen);
  console.log("High:", latestHigh);
  console.log("Low:", latestLow);
  console.log("Close:", latestClose);
  console.log("Volume:", latestVolume);
  res.render('Microsoft.ejs',{latestOpen,latestHigh,latestLow,latestClose,latestVolume});
});

app.post('/microsoft_data', (req, res) => {
  const { open, high, low, volume } = req.body;

  console.log("Open Price:", open);
  console.log("High Price:", high);
  console.log("Low Price:", low);
  console.log("Volume:", volume);
  res.redirect('/microsoft');
});

const apiUrl7 = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=NFLX&outputsize=compact&datatype=json`;
const options7 = {
  method: 'GET',
  url: apiUrl7, // Add the url property here
  headers: {
    'x-rapidapi-key': 'b45c9d86cfmshc11b6532db96e84p131c07jsn1c08f7341ca8',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
  }
};

app.get('/netflix',async(req,res)=>{
  // Fetch data from the API
  const response = await axios.get(apiUrl7, options7);
  const stockData = response.data;
  // Extract the latest date
  const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];

  // Get the latest refreshed data
  const latestData = stockData["Time Series (Daily)"][lastRefreshed];
  // Log the result
  console.log("Last Refreshed Date:", lastRefreshed);
  console.log("Latest Data:", latestData);
  // Example: Accessing specific values
  const latestOpen = latestData["1. open"];
  const latestHigh = latestData["2. high"];
  const latestLow = latestData["3. low"];
  const latestClose = latestData["4. close"];
  const latestVolume = latestData["5. volume"];
  console.log("Open:", latestOpen);
  console.log("High:", latestHigh);
  console.log("Low:", latestLow);
  console.log("Close:", latestClose);
  console.log("Volume:", latestVolume);
  res.render('Netflix.ejs',{latestOpen,latestHigh,latestLow,latestClose,latestVolume});
});

app.post('/netflix_data', (req, res) => {
  const { open, high, low, volume } = req.body;

  console.log("Open Price:", open);
  console.log("High Price:", high);
  console.log("Low Price:", low);
  console.log("Volume:", volume);
  res.redirect('/netflix');
});

const apiUrl8 = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=NVDA&outputsize=compact&datatype=json`;
const options8 = {
  method: 'GET',
  url: apiUrl8, // Add the url property here
  headers: {
    'x-rapidapi-key': 'b45c9d86cfmshc11b6532db96e84p131c07jsn1c08f7341ca8',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
  }
};

app.get('/nvdia',async(req,res)=>{
  // Fetch data from the API
  const response = await axios.get(apiUrl8, options8);
  const stockData = response.data;
  // Extract the latest date
  const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];

  // Get the latest refreshed data
  const latestData = stockData["Time Series (Daily)"][lastRefreshed];
  // Log the result
  console.log("Last Refreshed Date:", lastRefreshed);
  console.log("Latest Data:", latestData);
  // Example: Accessing specific values
  const latestOpen = latestData["1. open"];
  const latestHigh = latestData["2. high"];
  const latestLow = latestData["3. low"];
  const latestClose = latestData["4. close"];
  const latestVolume = latestData["5. volume"];
  console.log("Open:", latestOpen);
  console.log("High:", latestHigh);
  console.log("Low:", latestLow);
  console.log("Close:", latestClose);
  console.log("Volume:", latestVolume);
  res.render('NVDIA.ejs',{latestOpen,latestHigh,latestLow,latestClose,latestVolume});
});

app.post('/nvidia_data', (req, res) => {
  const { open, high, low, volume } = req.body;

  console.log("Open Price:", open);
  console.log("High Price:", high);
  console.log("Low Price:", low);
  console.log("Volume:", volume);
  res.redirect('/nvdia');
});

const apiUrl9 = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=PLTR&outputsize=compact&datatype=json`;
const options9 = {
  method: 'GET',
  url: apiUrl9, // Add the url property here
  headers: {
    'x-rapidapi-key': 'b45c9d86cfmshc11b6532db96e84p131c07jsn1c08f7341ca8',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
  }
};

app.get('/palantir',async(req,res)=>{
  // Fetch data from the API
  const response = await axios.get(apiUrl9, options9);
  const stockData = response.data;
  // Extract the latest date
  const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];

  // Get the latest refreshed data
  const latestData = stockData["Time Series (Daily)"][lastRefreshed];
  // Log the result
  console.log("Last Refreshed Date:", lastRefreshed);
  console.log("Latest Data:", latestData);
  // Example: Accessing specific values
  const latestOpen = latestData["1. open"];
  const latestHigh = latestData["2. high"];
  const latestLow = latestData["3. low"];
  const latestClose = latestData["4. close"];
  const latestVolume = latestData["5. volume"];
  console.log("Open:", latestOpen);
  console.log("High:", latestHigh);
  console.log("Low:", latestLow);
  console.log("Close:", latestClose);
  console.log("Volume:", latestVolume);
  res.render('Palantir.ejs',{latestOpen,latestHigh,latestLow,latestClose,latestVolume});
});

app.post('/palantir_data', (req, res) => {
  const { open, high, low, volume } = req.body;

  console.log("Open Price:", open);
  console.log("High Price:", high);
  console.log("Low Price:", low);
  console.log("Volume:", volume);
  res.redirect('/palantir');
});

const apiUrl10 = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=TSLA&outputsize=compact&datatype=json`;
const options10 = {
  method: 'GET',
  url: apiUrl10, // Add the url property here
  headers: {
    'x-rapidapi-key': 'b45c9d86cfmshc11b6532db96e84p131c07jsn1c08f7341ca8',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
  }
};

app.get('/tesla',async(req,res)=>{
  // Fetch data from the API
  const response = await axios.get(apiUrl10, options10);
  const stockData = response.data;
  // Extract the latest date
  const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];

  // Get the latest refreshed data
  const latestData = stockData["Time Series (Daily)"][lastRefreshed];
  // Log the result
  console.log("Last Refreshed Date:", lastRefreshed);
  console.log("Latest Data:", latestData);
  // Example: Accessing specific values
  const latestOpen = latestData["1. open"];
  const latestHigh = latestData["2. high"];
  const latestLow = latestData["3. low"];
  const latestClose = latestData["4. close"];
  const latestVolume = latestData["5. volume"];
  console.log("Open:", latestOpen);
  console.log("High:", latestHigh);
  console.log("Low:", latestLow);
  console.log("Close:", latestClose);
  console.log("Volume:", latestVolume);
  res.render('Tesla.ejs',{latestOpen,latestHigh,latestLow,latestClose,latestVolume});
});

app.post('/tesla_data', (req, res) => {
  const { open, high, low, volume } = req.body;

  console.log("Open Price:", open);
  console.log("High Price:", high);
  console.log("Low Price:", low);
  console.log("Volume:", volume);
  res.redirect('/tesla');
});

app.get('/stock', async (req, res) => {
  try {
    const response = await axios.request(options);
    const openPrice = response.data["Time Series (Daily)"]["2024-11-05"]["1. open"];
    console.log(openPrice);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching stock data.");
  }
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
