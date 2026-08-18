import api from "./api";

const getTasks = async (params = {}) => {
  const { data } = await api.get("/tasks", { params });
  return data.tasks;
};

const getTodayTasks = async () => {
  const { data } = await api.get("/tasks/today");
  return data.tasks;
};

const createTask = async (task) => {
  const { data } = await api.post("/tasks", task);
  return data.task;
};

const updateTask = async (id, updates) => {
  const { data } = await api.put(`/tasks/${id}`, updates);
  return data.task;
};

const completeTask = async (id, completed) => {
  const { data } = await api.patch(`/tasks/${id}/complete`, { completed });
  return data.task;
};

const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};

export default {
  getTasks,
  getTodayTasks,
  createTask,
  updateTask,
  completeTask,
  deleteTask,
};
