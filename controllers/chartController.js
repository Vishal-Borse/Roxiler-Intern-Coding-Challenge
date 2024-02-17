const getMonthNumberFromName = require("../utils/monthNumber");
const pool = require("../db/db");

const barChart = async (req, res) => {
  const monthNumber = getMonthNumberFromName(req.query.month);

  try {
    const priceRanges = [
      { start: 0, end: 100 },
      { start: 101, end: 200 },
      { start: 201, end: 300 },
      { start: 301, end: 400 },
      { start: 401, end: 500 },
      { start: 501, end: 600 },
      { start: 601, end: 700 },
      { start: 701, end: 800 },
      { start: 801, end: 900 },
      { start: 901, end: null },
    ];

    const barChartData = [];

    // Iterate over each price range
    for (const range of priceRanges) {
      const start = range.start;
      const end = range.end;

      let queryText;
      let queryValues;

      if (end === null) {
        queryText = `
            SELECT COUNT(*) AS count
            FROM product_transaction
            WHERE price >= $1 AND EXTRACT(MONTH FROM dateOfSale) = $2;
          `;
        queryValues = [start, monthNumber];
      } else {
        queryText = `
            SELECT COUNT(*) AS count
            FROM product_transaction
            WHERE price >= $1 AND price <= $2 AND EXTRACT(MONTH FROM dateOfSale) = $3;
          `;
        queryValues = [start, end, monthNumber];
      }

      const result = await pool.query(queryText, queryValues);
      const count = result.rows[0].count;

      barChartData.push({
        range: `${start}-${end === null ? "above" : end}`,
        count,
      });
    }

    res.status(200).json({
      barChart: barChartData,
      status: "Barchart Creted Successfully",
    });
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({
      status: "Error",
      error: "Internal server error",
    });
  }
};

const pieChart = async (req, res) => {
  const monthNumber = getMonthNumberFromName(req.query.month);
  try {
    const query = {
      text: `
              SELECT category, COUNT(*) AS count
              FROM product_transaction
              WHERE EXTRACT(MONTH FROM dateOfSale) = $1
              GROUP BY category;
            `,
      values: [monthNumber],
    };

    const result = await pool.query(query);
    res.status(200).json({
      pieChart: result.rows,
      status: "PieChart Created Successfully",
    });
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).json({
      status: "Error",
      error: "Internal server error",
    });
  }
};

module.exports = { pieChart, barChart };
