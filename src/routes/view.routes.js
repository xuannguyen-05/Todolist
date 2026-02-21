const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");

// Trang chính
router.get("/", async (req, res) => {
  const tasks = await Task.find();

  const total = tasks.length;
  const done = tasks.filter(t => t.isDone).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  res.render("index", { tasks, percent });
});

// Thêm task
router.post("/add", async (req, res) => {
  await Task.create({
    title: req.body.title,
    user: "000000000000000000000000"
  });

  res.redirect("/");
});

// Toggle hoàn thành
router.post("/toggle/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  task.isDone = !task.isDone;
  task.doneAt = task.isDone ? new Date() : null;

  await task.save();
  res.redirect("/");
});

// Xóa task
router.post("/delete/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;