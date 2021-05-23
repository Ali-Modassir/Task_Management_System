const { Router } = require("express");

const workspaceController = require("../controllers/workspaceController");

const router = Router();

//routes

//Base url -->  /api/dashboard/workspace

router.get("/allTasks/:userId", workspaceController.get_tasks); //for sending the list of tasks to client
router.post("/task/comments", workspaceController.post_comment); //for adding a new comment to a task
router.post("/task", workspaceController.post_tasks); //for adding a new task
router.get("/allUsers", workspaceController.get_allUsers); //Getting all user
router.get("/allUsers/:userId", workspaceController.get_userById); //Getting user by id
router.post("/sendTask", workspaceController.send_Task_to_VE); //sending taskDetails to VE
router.get("/allUsers/tasks/:id", workspaceController.get_taskById); // Get task by id ;
router.post("/VE/addTask", workspaceController.add_VE_task); //add VE task
router.get("/VE/task/:id", workspaceController.get_All_VE_tasks); //get all VE tasks ;
router.get("/VE/data", workspaceController.get_All_VE); //Get all VE data
router.post("/issue", workspaceController.post_issue_admin); //send client issue to admin

module.exports = router;
