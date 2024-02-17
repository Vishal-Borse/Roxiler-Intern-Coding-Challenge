// Function to create the table
const createTable = async () => {
  const createTableQuery = `
  CREATE TABLE product_transaction(
    id INTEGER PRIMARY KEY,
    title TEXT,
    price FLOAT,
    description TEXT,
    category TEXT,
    image TEXT,
    sold BOOLEAN,
    dateOfSale TIMESTAMP
  )
  `;
  await pool.query(createTableQuery);
};

module.exports = createTable;
