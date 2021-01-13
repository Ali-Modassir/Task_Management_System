import { useState, useCallback } from "react";

export const useTaskHook = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [allComments, setAllComments] = useState([]);

  const setAllTasksHandler = useCallback((tasks) => {
    setAllTasks(tasks);
  }, []);

  const commentsHandler = useCallback((comment) => {
    setAllComments(comment);
  }, []);

  return { allTasks, setAllTasksHandler, allComments, commentsHandler };
};
