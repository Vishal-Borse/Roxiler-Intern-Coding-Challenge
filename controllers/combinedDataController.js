const axios = require("axios");

const combinedData = async (req, res) => {
  const requiredMonth = req.query.month;

  try {
    const statistics = await axios.get(
      `http://localhost:${process.env.PORT}/statistics?month=${requiredMonth}`
    );

    const piechartData = await axios.get(
      `http://localhost:${process.env.PORT}/visualize/piechart?month=${requiredMonth}`
    );

    const barchartData = await axios.get(
      `http://localhost:${process.env.PORT}/visualize/barchart?month=${requiredMonth}`
    );
    res.status(200).json({
      Combined_Result: {
        statistics: statistics.data.statistics,
        piechart: piechartData.data.pieChart,
        barchart: barchartData.data.barChart,
      },
      Status: "Results Fetched Successfully",
    });
  } catch (error) {
    console.error("Error fetching Combined Results:", error);
    res.status(500).json({
      status: "Error",
      error: "Internal server error",
    });
  }
};

module.exports = combinedData;
