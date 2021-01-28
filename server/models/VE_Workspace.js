const mongoose = require("mongoose");

const VE_WorkspaceSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userEmail: String,
  tasks: [
    {
      id: Number,
      assignUserId: String,
      assignUserName: String,
      assignUserEmail: String,
      assignedOn: Date,
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
const VE_Workspace = mongoose.model("ve_workspace", VE_WorkspaceSchema);

module.exports = VE_Workspace;
