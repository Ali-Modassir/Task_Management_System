const Workspace = require("../models/Workspace");
const VE_Workspace = require("../models/VE_Workspace");
const UsersModel = require("../models/User");
const emailTemplates = require("../config/nodemailerMailTemps");
const sendEmail = require("../config/nodemailer"); //nodemailer

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
      userName,
      userEmail,
      taskId,
    } = req.body;
    const getUser = await Workspace.findOne({ userId: userId });
    var totalTask = 0;
    if (getUser) {
      totalTask = getUser.tasks.length;
    }
    const newTask = {
      id: totalTask + 1,
      taskId,
      taskName,
      taskType,
      taskDescription,
      dueDate,
      assigned_VE_Name: "Not Assigned",
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
        userName: userName,
        userEmail: userEmail,
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
  let { type } = req.body;
  if (type === "ve") {
    const { comment, taskId, userId, person, assignUserId } = req.body;
    const newComment = {
      person: person,
      comment: comment,
      time: Date.now(),
    };
    try {
      const VEcomments = await VE_Workspace.findOneAndUpdate(
        { userId: userId, "tasks.taskId": taskId },
        {
          $push: {
            "tasks.$.taskComments": newComment,
          },
        },
        { returnOriginal: true }
      );

      await Workspace.findOneAndUpdate(
        { userId: assignUserId, "tasks.taskId": taskId },
        {
          $push: {
            "tasks.$.taskComments": newComment,
          },
        },
        { returnOriginal: true }
      );
      res.json({ message: "New Comment Added", comments: VEcomments });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  } else if (type === "client") {
    const { comment, taskId, userId, assigned_VE_Id, person } = req.body;
    const newComment = {
      person: person,
      comment: comment,
      time: Date.now(),
    };
    try {
      const clientComments = await Workspace.findOneAndUpdate(
        { userId: userId, "tasks.taskId": taskId },
        {
          $push: {
            "tasks.$.taskComments": newComment,
          },
        }
      );
      await VE_Workspace.findOneAndUpdate(
        { userId: assigned_VE_Id, "tasks.taskId": taskId },
        {
          $push: {
            "tasks.$.taskComments": newComment,
          },
        }
      );
      res.json({ message: "New Comment Added", comments: clientComments });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
};

//Getting all the users data for admin panel
module.exports.get_allUsers = async (req, res, next) => {
  try {
    const allUsers = await Workspace.find({});
    if (allUsers) {
      res.json(allUsers);
    } else {
      res.json({ message: "No Users found", ok: false });
    }
  } catch (err) {
    res.json(err);
  }
};

//Get user Details by id
module.exports.get_userById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await Workspace.findOne({ userId: userId });
    if (user) {
      res.json(user);
    } else {
      console.log("Not found");
      res.json({ message: "User Not Found", ok: false });
    }
  } catch (err) {
    res.json(err);
  }
};

//Get task by userId and taskId
module.exports.get_taskById = async (req, res, next) => {
  const { id } = req.params;
  const ids = id.split("=");
  const userId = ids[0];
  const taskId = ids[1];
  try {
    const user = await Workspace.findOne({
      userId: userId,
      "tasks.taskId": taskId,
    });
    if (user) {
      let taskArray = user.tasks;
      const task = taskArray.filter((task) => task.taskId === taskId);
      if (task) {
        res.json(task[0]);
      } else {
        res.json({ message: "Task Not found" });
      }
    } else {
      res.json({ message: "User Not available" });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Getting all VE
module.exports.get_All_VE = async (req, res, next) => {
  try {
    const users = await UsersModel.User.find({ "local.userType": "VE" });
    let VE_data = [];
    if (users) {
      users.forEach((user) => {
        let userData = {
          userId: user._id,
          name: user.local.name,
          email: user.local.email,
        };
        VE_data.push(userData);
      });
      res.json(VE_data);
    } else {
      res.json({ message: "No VE data" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

//Sending Task Details to our VE
module.exports.send_Task_to_VE = async (req, res, next) => {
  const {
    name,
    userId,
    email,
    assignUserId,
    assignUserName,
    assignUserEmail,
    taskName,
    taskType,
    taskId,
    taskDescription,
  } = req.body;
  try {
    await sendEmail(
      email,
      emailTemplates.taskDetailsToVE(
        name,
        userId,
        assignUserId,
        assignUserName,
        taskName,
        taskType,
        taskId,
        taskDescription
      )
    );

    await Workspace.findOneAndUpdate(
      { userId: userId, "tasks.taskId": taskId },
      {
        $set: {
          "tasks.$.status": true,
        },
      },
      { returnOriginal: false }
    );
    res.json({ message: "Task Assigned", ok: true });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

//Adding task of VE
module.exports.add_VE_task = async (req, res, next) => {
  const { userId, assignUserId, assignTaskId } = req.body;
  try {
    const VE_details = await UsersModel.User.findById(userId);

    await Workspace.findOneAndUpdate(
      { userId: assignUserId, "tasks.taskId": assignTaskId },
      {
        $set: {
          "tasks.$.assigned_VE_Name": VE_details.local.name,
          "tasks.$.assigned_VE_Email": VE_details.local.email,
          "tasks.$.assigned_VE_Id": userId,
          "tasks.$.status": true,
        },
      },
      { returnOriginal: false }
    );
    const assignUser = await Workspace.findOne({
      userId: assignUserId,
      "tasks.taskId": assignTaskId,
    });
    let task;
    if (assignUser) {
      let taskArray = assignUser.tasks;
      const tasks = taskArray.filter((task) => task.taskId === assignTaskId);
      task = tasks[0];
    } else {
      res.json({ message: "Not found", ok: false });
    }

    const existingVE = await VE_Workspace.findOne({ userId: userId });
    var totalTask = 0;
    if (existingVE) {
      totalTask = existingVE.tasks.length;
    }
    const newTask = {
      id: totalTask + 1,
      assignUserId: assignUserId,
      assignUserName: assignUser.userName,
      assignUserEmail: assignUser.userEmail,
      assignedOn: Date.now(),
      taskId: assignTaskId,
      taskName: task.taskName,
      taskType: task.taskType,
      taskDescription: task.taskDescription,
      dueDate: task.dueDate,
      taskComments: task.taskComments,
    };
    const updatingTaskList = await VE_Workspace.findOneAndUpdate(
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
      if (VE_details) {
        const newTaskList = await new VE_Workspace({
          userId: userId,
          userName: VE_details.local.name,
          userEmail: VE_details.local.email,
          tasks: [newTask],
        });
        await newTaskList.save();
        res.status(201).json({ message: "Task added to your list", ok: true });
      } else {
        res.json({ message: "VE data not available" });
      }
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Getting all task of VE
module.exports.get_All_VE_tasks = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await VE_Workspace.findOne({ userId: id });
    if (user) {
      res.json(user.tasks);
    } else {
      res.json({ message: "No Task Assigned", ok: false });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Sending issue to admin
module.exports.post_issue_admin = async (req, res, next) => {
  const { task, issueDescription, email } = req.body;
  try {
    await sendEmail(
      process.env.MAIL_USER,
      emailTemplates.sendIssue(task, issueDescription, email)
    );
    res.json({ message: "Successfully send", ok: true });
  } catch (error) {
    res.json({ message: "Some error occcured in sending email", ok: false });
  }
};
