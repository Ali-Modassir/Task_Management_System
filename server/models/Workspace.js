const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
  userId: String,
  tasks: [
    {
      taskId: String,
      taskName: String,
      taskType: Object,
      taskDescription: String,
      dueDate: Date,
      status: {
        type: Boolean,
        default: false,
      },
      taskComments: [
        {
          person: String,
          comment: String,
          time: {
            type: Date,
          },
        },
      ],
    },
  ],
});
const Workspace = mongoose.model("workspace", workspaceSchema);

module.exports = Workspace;
