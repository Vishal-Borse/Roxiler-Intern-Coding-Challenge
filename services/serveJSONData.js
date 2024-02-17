
const axios = require('axios');

async function serveJSONData() {
  const response = await axios.get(
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
  );
  return response.data;

}
module.exports = serveJSONData;

