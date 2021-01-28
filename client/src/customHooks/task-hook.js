import { useState, useCallback, useEffect } from "react";
import { useHttpClient } from "../customHooks/http-hook";

export const useTaskHook = () => {
  //custom hook for http reqs
  const { sendRequest } = useHttpClient();
  //states
  const [allTasks, setAllTasks] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [VE_details, setVE_details] = useState([]);

  useEffect(() => {
    sendRequest(process.env.REACT_APP_BASE_URL + "/dashboard/workspace/VE/data")
      .then((res) => setVE_details(res))
      .catch((err) => console.log(err));
  }, []);

  const setAllTasksHandler = useCallback((tasks) => {
    setAllTasks(tasks);
  }, []);

  const commentsHandler = useCallback((comment) => {
    setAllComments(comment);
  }, []);

  const setAllUsersHandler = (user) => {
    setAllUsers(user);
  };

  return {
    allTasks,
    setAllTasksHandler,
    allComments,
    commentsHandler,
    allUsers,
    VE_details,
    setAllUsersHandler,
  };
};
