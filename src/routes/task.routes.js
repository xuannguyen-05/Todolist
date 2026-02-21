const express = require('express');
const router = express.Router();

const {createTask, 
    getAllTasks, 
    getByUserName, 
    getTodayTasks,
    getNotDone,
    getUserNguyenTasks,
    assignTask,
    completeTask} = require('../controllers/task.controller')

router.post("/", createTask)
router.get("/", getAllTasks)
router.get("/user/:username", getByUserName)
router.get("/today", getTodayTasks)
router.get("/not-done", getNotDone)
router.get("/nguyen", getUserNguyenTasks)


module.exports = router;