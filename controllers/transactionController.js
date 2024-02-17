const getMonthNumberFromName = require("../utils/monthNumber");
const pool = require("../db/db");

const transactions = async (req, res) => {
  let { search, page } = req.query;
  const perPage = 10;

  if (page == undefined || page == "") {
    page = 1;
  }
  try {
    const offset = (page - 1) * perPage;
    const queryString = `
          SELECT *
          FROM product_transaction
          WHERE title ILIKE $1 OR description ILIKE $1 OR price::text ILIKE $1
          LIMIT $2 OFFSET $3`;
    const result = await pool.query(queryString, [
      `%${search}%`,
      perPage,
      offset,
    ]);
    res.status(200).json({
      transactions: result.rows,
      currentPage: page,
      perPage,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = transactions;

module.exports = transactions;
