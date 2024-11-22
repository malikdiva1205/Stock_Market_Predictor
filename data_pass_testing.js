const fs = require('fs');

// Data to pass
const data = {
  open: 20,
  high: 30,
  low: 10,
  volume: 1000
};

// Write to JSON file
fs.writeFileSync('data_pass.json', JSON.stringify(data, null, 2), 'utf-8');
console.log("Data written to data.json");
