const fs = require('fs');
const path = require('path');

// Helper function to introduce a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const companies = ['AAPL', 'AMZN', 'GOOG', 'INTC', 'META', 'MSFT', 'NFLX', 'NVDA', 'PLTR', 'TSLA'];
let i = 0;

// Define the path to the Dataset folder
const datasetFolderPath = path.join(__dirname, 'Dataset');

// Function to get the last row's date from the specific company's CSV file
function getLastRowDate(companySymbol) {
    try {
        const csvFilePath = path.join(datasetFolderPath, `${companySymbol}_DATA.csv`); // Dynamic path for each company
        
        // Check if file exists
        if (!fs.existsSync(csvFilePath)) {
            return null; // Return null if the file doesn't exist
        }

        // Read the CSV file content
        const csvData = fs.readFileSync(csvFilePath, 'utf8');

        // Split the data into rows
        const rows = csvData.split('\n');

        // Remove any empty lines at the end
        const validRows = rows.filter(row => row.trim() !== '');

        // Get the last row
        const lastRow = validRows[validRows.length - 1];

        // Extract the date value from the last row (assuming the first column is Date)
        const lastRowData = lastRow.split(',');
        const lastRowDate = lastRowData[0];

        console.log(`Last Row Date for ${companySymbol}:`, lastRowDate);
        return lastRowDate;
    } catch (error) {
        console.error("Error reading or processing the CSV file:", error);
        return null;
    }
}

async function fetchStockData() {
    for (; i < companies.length; i++) {
        const apiUrl = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=${companies[i]}&outputsize=compact&datatype=json`;

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b45c9d86cfmshc11b6532db96e84p131c07jsn1c08f7341ca8',
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(apiUrl, options);

            // Check if the response is OK
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            // Parse the JSON data
            const data = await response.json();

            // Get the latest date
            const latestDate = data["Meta Data"]["3. Last Refreshed"];
            const dailyData = data["Time Series (Daily)"][latestDate];

            // Extract required values
            const openPrice = dailyData["1. open"];
            const highPrice = dailyData["2. high"];
            const lowPrice = dailyData["3. low"];
            const closePrice = dailyData["4. close"];
            const volume = dailyData["5. volume"];

            // Log extracted values
            console.log(`Values for ${companies[i]} on ${latestDate}:`);
            console.log("Open Price:", openPrice);
            console.log("High Price:", highPrice);
            console.log("Low Price:", lowPrice);
            console.log("Close Price:", closePrice);
            console.log("Volume:", volume);

            // Get the last row's date for the current company
            const lastData = getLastRowDate(companies[i]);

            if (lastData != latestDate) {
                // Append data to CSV for this company
                const csvRow = `${latestDate},${openPrice},${highPrice},${lowPrice},${closePrice},${volume}\n`;
                const csvFilePath = path.join(datasetFolderPath, `${companies[i]}_DATA.csv`);

                if (!fs.existsSync(csvFilePath)) {
                    // If file doesn't exist, write headers first
                    fs.writeFileSync(csvFilePath, 'Date,Open,High,Low,Close,Volume\n');
                }
                fs.appendFileSync(csvFilePath, csvRow);
            } else {
                console.log(`Data for ${companies[i]} is already up to date.`);
            }

        } catch (error) {
            console.error(`Error fetching data for ${companies[i]}:`, error);
        }

        // Add a delay to prevent hitting the API rate limit
        await delay(10000); // Delay of 10 seconds (adjust as needed)
    }
}

// Call the function
fetchStockData();
