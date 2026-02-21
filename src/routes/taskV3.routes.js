const express = require('express');
const router = express.Router();
const { checkAdmin } = require('../middleware/auth.middleware')

const {
    assignTask,
    completeTask,
    getV3Page} = require('../controllers/task.controller')

router.get("/", getV3Page)
router.post("/assign", checkAdmin, assignTask)
router.post("/complete/:taskId", completeTask)

module.exports = router;