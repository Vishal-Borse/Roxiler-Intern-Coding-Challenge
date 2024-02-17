const { Router } = require("express");
const router = Router();
const { pieChart, barChart } = require("../controllers/chartController");
const statistics = require("../controllers/statisticsController");
const combinedData = require("../controllers/combinedDataController");
const initializeDatabase = require("../controllers/initializeDatabaseController");
const transactions = require("../controllers/transactionController");
const rateLimiter = require("../middlewares/rateLimiter");
const validateMonth = require("../middlewares/monthValidator");

router.get("/initialize-database", rateLimiter, initializeDatabase);
router.get("/transactions", rateLimiter, transactions);
router.get("/statistics", rateLimiter, statistics);
router.get("/bar-chart", [rateLimiter, validateMonth], barChart);
router.get("/pie-chart", [rateLimiter, validateMonth], pieChart);
router.get("/combined-data", [rateLimiter, validateMonth], combinedData);

module.exports = router;
