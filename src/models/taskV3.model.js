const mongoose = require("mongoose");

const TaskV3Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    // Người tạo task (admin)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Danh sách user được giao task
    assignedUsers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        isDone: {
          type: Boolean,
          default: false
        },
        doneAt: {
          type: Date,
          default: null
        }
      }
    ],

    // Trạng thái hoàn thành tổng của task
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const TaskV3 = mongoose.model("TaskV3", TaskV3Schema);

module.exports = TaskV3;