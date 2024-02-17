const pool = require("../db/db");
const serveJSONData = require("../services/serveJSONData");
const createTable = require('../utils/createTable');

const initializeDatabase = async (req, res) => {
  try {
    // Check if the table exists
    const tableCheckQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'product_transaction'
      )
    `;
    const { rows } = await pool.query(tableCheckQuery);
    const tableExists = rows[0].exists;

    // If table doesn't exist, create it
    if (!tableExists) {
      await createTable();
    }

    // Fetch data from third-party API
    const data = await serveJSONData();

    // Insert data into the database
    const insertQuery = `
      INSERT INTO product_transaction (id, title, price, description, category, image, sold, dateOfSale)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT DO NOTHING
    `;

    for (const item of data) {
      const values = [
        item.id,
        item.title,
        item.price,
        item.description,
        item.category,
        item.image,
        item.sold,
        item.dateOfSale,
      ];
      await pool.query(insertQuery, values);
    }

    res.status(200).json({
      message: "Data Inserted Successfully",
    });
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};



module.exports = initializeDatabase;
