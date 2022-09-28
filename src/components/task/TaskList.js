import axios from "axios";
import toast from "react-hot-toast";

import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../../context/task";
import { AuthContext } from "../../context/auth";

import useSearch from "../../hooks/useSearch";
import Timer from "./Timer";

import Masonry from "react-masonry-css";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SearchBar from "../forms/SearchBar";
dayjs.extend(relativeTime);

export default function TaskList() {
  const [task, setTask] = useContext(TaskContext);
  const [auth, setAuth] = useContext(AuthContext);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { keyword, setKeyword, filteredTask } = useSearch();

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadTask();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/task-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadTask = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/tasks?page=${page}`);
      setTask((prev) => ({ ...prev, tasks: [...prev.tasks, ...data] }));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleClick = (item) => {
    if (auth?.user?._id !== item?.postedBy?._id) {
      toast.error("You can't either update or delete this task");
      return;
    }
    setTask({ ...task, selected: item });
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SearchBar keyword={keyword} setKeyword={setKeyword} />
          <pre
            className="text-center"
            style={{
              textDecoration: "underline gold",
              textDecorationThickness: "3px",
            }}
          >
            {total} tasks
          </pre>

          <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {filteredTask.map((task) => (
            <div
              key={task._id}
              style={{
                backgroundColor:
                  auth?.user?._id !== task?.postedBy?._id
                    ? "#ffe6e6"
                    : "#f2ffe6",
              }}
              className="rounded shadow p-2 m-2 tasklist"
              onClick={() => handleClick(task)}
            >
              <p>{task.task}</p>
              <p
                className="float-end"
                style={{ fontSize: "12px", marginTop: "-15px" }}
              >
                {/* {dayjs(task.createdAt).fromNow()} by{" "} */}
                <Timer time={task.createdAt} /> by <b>{task?.postedBy?.name}</b>
              </p>
            </div>
          ))}
          </Masonry>
          
          {task?.tasks?.length < total && (
            <div className="text-center mt-4 mb-4">
              <button
                disabled={loading}
                className="btn btn-outline-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
