const Workspace = require("../models/Workspace");

module.exports.get_tasks = async (req, res) => {
  try {
    const tasks = await Workspace.find({});
    res.json(tasks);
  } catch (err) {
    res.json(err);
  }
};

module.exports.post_tasks = async (req, res) => {
  try {
    const { taskName, taskType, taskDescription, dueDate } = req.body;

    const newTask = await new Workspace({
      taskName,
      taskType,
      taskDescription,
      dueDate,
    });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully", ok: true });
  } catch (err) {
    res.json(err);
  }
};
