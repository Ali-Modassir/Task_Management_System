import { createContext } from "react";

export const TaskContext = createContext({
  allUsers: [],
  allTasks: [],
  allComments: [],
  VE_details: [],
  commentsHandler: () => {},
  setAllTasksHandler: () => {},
  setAllUsersHandler: () => {},
});
