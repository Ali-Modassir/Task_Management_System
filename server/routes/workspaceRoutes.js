const { Router } = require("express");

const workspaceController = require("../controllers/workspaceController");

const router = Router();

//routes
router.get("/allTasks/:userId", workspaceController.get_tasks); //for sending the list of tasks
router.post("/task/comments", workspaceController.post_comment); //for adding a new comment to a task
router.post("/task", workspaceController.post_tasks); //for adding a new task

module.exports = router;
