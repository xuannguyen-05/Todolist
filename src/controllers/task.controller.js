const Task = require("../models/task.model")
const TaskV3 = require("../models/taskV3.model")
const User = require("../models/user.model")

const createTask = async(req, res) => {
    try {
        const {title, userId} = req.body;

        const user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const task = Task.create({
            title,
            user: userId
        });

        return res.status(201).json(task)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAllTasks = async(req, res) => {
    const tasks = await Task.find().populate("user")
    return res.status(200).json(tasks)
}

const getByUserName = async(req, res) => {
    const {username} = req.params

    const user = await User.findOne({username});
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const tasks = await Task.find({user: user._id});

    return res.json(tasks)
}

// xem lại
const getTodayTasks = async(req, res) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
        createdAt: { $gte: start, $lte: end }
    });

    return res.json(tasks);
}

const getNotDone = async(req, res) => {
    const tasks = await Task.find({isDone: false});
    return res.json(tasks)
}

// xem lại
const getUserNguyenTasks = async(req, res) => {
    const users = await User.find({
        fullName: { $regex: "^Nguyễn", $options: "i" }
    });

    const userIds = users.map(u => u._id);

    const tasks = await Task.find({
        user: { $in: userIds }
    }).populate("user");

    return res.json(tasks);
}

const assignTask = async (req, res) => {
  const { title, createdBy } = req.body;
  // Khi chọn 1 user, Express trả về string; chọn nhiều mới là array
  let { userIds } = req.body;
  if (!Array.isArray(userIds)) userIds = [userIds];

  const assignedUsers = userIds.map(id => ({
    user: id
  }));

  await TaskV3.create({
    title,
    createdBy,
    assignedUsers
  });

  res.redirect("/v3");
};

const completeTask = async (req, res) => {
  const { userId } = req.body; 

  const task = await TaskV3.findById(req.params.taskId);

  const userTask = task.assignedUsers.find(
    u => u.user.toString() === userId
  );

  if (!userTask) return res.redirect("/v3");

  userTask.isDone = true;
  userTask.doneAt = new Date();

  task.isCompleted = task.assignedUsers.every(u => u.isDone);

  await task.save();

  res.redirect("/v3");
};

const getV3Page = async (req, res) => {
  const tasks = await TaskV3.find()
    .populate("createdBy")
    .populate("assignedUsers.user");

  const users = await User.find();

  res.render("v3", {
    tasks,
    users,
    currentUser: req.user || null   
  });
};

module.exports = {
    createTask,
    getAllTasks,
    getByUserName,
    getTodayTasks,
    getNotDone,
    getUserNguyenTasks,
    assignTask,
    completeTask,
    getV3Page
}