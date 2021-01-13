import { createContext } from "react";

export const TaskContext = createContext({
  allTasks: [],
  allComments: [],
  commentsHandler: () => {},
  setAllTasksHandler: () => {},
});
