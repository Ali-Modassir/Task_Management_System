const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
  taskName: String,
  taskType: Object,
  taskDescription: String,
  dueDate: Date,
});
const Workspace = mongoose.model("workspace", workspaceSchema);

module.exports = Workspace;
