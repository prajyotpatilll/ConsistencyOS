import api from "./api";

const getProblems = async () => {
  const { data } = await api.get("/dsa");
  return data.problems;
};

const getTodayProblems = async () => {
  const { data } = await api.get("/dsa/today");
  return data.problems;
};

const createProblem = async (problem) => {
  const { data } = await api.post("/dsa", problem);
  return data.problem;
};

const updateProblem = async (id, updates) => {
  const { data } = await api.put(`/dsa/${id}`, updates);
  return data.problem;
};

const deleteProblem = async (id) => {
  const { data } = await api.delete(`/dsa/${id}`);
  return data;
};

export default {
  getProblems,
  getTodayProblems,
  createProblem,
  updateProblem,
  deleteProblem,
};
