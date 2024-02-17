const getMonthNumberFromName = require("../utils/monthNumber");
const pool = require("../db/db");

const statistics = async (req, res) => {
  const monthNumber = getMonthNumberFromName(req.query.month);

  try {
    const saleAmountQuery = {
      text: `SELECT SUM(price) FROM product_transaction WHERE EXTRACT(MONTH FROM dateOfSale) = $1 AND sold = true;`,
      values: [monthNumber],
    };
    const soldItemsQuery = {
      text: `SELECT COUNT(*) FROM product_transaction WHERE EXTRACT(MONTH FROM dateOfSale) = $1 AND sold = true;`,
      values: [monthNumber],
    };
    const notSoldItemsQuery = {
      text: `SELECT COUNT(*) FROM product_transaction WHERE EXTRACT(MONTH FROM dateOfSale) = $1 AND sold = false;`,
      values: [monthNumber],
    };

    const [saleAmountResult, soldItemsResult, notSoldItemsResult] =
      await Promise.all([
        pool.query(saleAmountQuery),
        pool.query(soldItemsQuery),
        pool.query(notSoldItemsQuery),
      ]);

    const statistics = {
      saleAmount: saleAmountResult.rows[0].sum || 0,
      soldItems: soldItemsResult.rows[0].count || 0,
      notSoldItems: notSoldItemsResult.rows[0].count || 0,
    };

    res.status(200).json({
      statistics,
      status: "Statistics Fetched Successfully",
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({
      status: "Error",
      error: "Internal server error",
    });
  }
};

module.exports = statistics;
