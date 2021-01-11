const Workspace = require("../models/Workspace");

//Getting the list of all tasks
module.exports.get_tasks = async (req, res) => {
  //Will recieve the userId during api request on client to search the user
  const { userId } = req.params;
  try {
    const userTasks = await Workspace.findOne({ userId: userId });
    if (userTasks) {
      res.json(userTasks.tasks);
    } else {
      res.json({ message: "No Task Assigned", ok: false });
    }
  } catch (err) {
    res.json(err);
  }
};

//Adding a task
module.exports.post_tasks = async (req, res) => {
  try {
    const {
      taskName,
      taskType,
      taskDescription,
      dueDate,
      userId,
      taskId,
    } = req.body;
    const newTask = {
      taskId,
      taskName,
      taskType,
      taskDescription,
      dueDate,
    };
    //Finding that user and pushing the task in tasks array of user
    const updatingTaskList = await Workspace.findOneAndUpdate(
      {
        userId: userId,
      },
      {
        $push: {
          tasks: newTask,
        },
      },
      { returnOriginal: false }
    );
    if (updatingTaskList) {
      res.status(201).json({
        task: updatingTaskList.tasks,
        message: "New Task Added",
        ok: true,
      });
    } else {
      //Creating newUser Workspace model and the storing task to tasks array
      const newTaskList = await new Workspace({
        userId: userId,
        tasks: [newTask],
      });
      await newTaskList.save();
      res.status(201).json({ message: "Task created successfully", ok: true });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Adding a comment (POST)
module.exports.post_comment = async (req, res) => {
  const { comment, taskId, userId } = req.body;
  var person;
  if (userId) {
    person = "user";
  } else {
    person = "admin";
  }
  try {
    const newComment = {
      person: person,
      comment: comment,
      time: Date.now(),
    };
    //Finding the task by userId and taskId and then pushing comment to taskComments array
    const userCommentUpdate = await Workspace.findOneAndUpdate(
      { userId: userId, "tasks.taskId": taskId },
      {
        $push: {
          "tasks.$.taskComments": newComment,
        },
      },
      { returnOriginal: false }
    );
    res
      .status(201)
      .json({
        comment: userCommentUpdate.tasks,
        message: "Comment Added Successfully",
        ok: true,
      });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};
