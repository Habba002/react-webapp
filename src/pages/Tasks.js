import { useEffect, useContext } from "react";
import { TaskContext } from "../context/task";

import CreateTask from "../components/task/CreateTask";
import TaskList from "../components/task/TaskList";
import UpdateTask from "../components/task/UpdateTask";

import socket from "../socket";

import axios from "axios";

export default function Tasks() {
  const [task, setTask] = useContext(TaskContext);

  useEffect(() => {
    loadTask();
  }, []);

  useEffect(() => {
    socket.on("new-task", (item) => {
      setTask((prev) => ({ ...prev, tasks: [item, ...task.tasks] }));

      return () => socket.off("new-task");
    });
  });

  const loadTask = async () => {
    try {
      const { data } = await axios.get("/tasks?page=1");
      setTask({ ...task, tasks: data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CreateTask />
        <TaskList />
      <UpdateTask />
    </>
  );
}
