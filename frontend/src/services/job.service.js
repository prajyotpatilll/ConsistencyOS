import api from "./api";

const getApplications = async () => {
  const { data } = await api.get("/jobs");
  return data.applications;
};

const createApplication = async (application) => {
  const { data } = await api.post("/jobs", application);
  return data.application;
};

const updateApplication = async (id, updates) => {
  const { data } = await api.put(`/jobs/${id}`, updates);
  return data.application;
};

const deleteApplication = async (id) => {
  const { data } = await api.delete(`/jobs/${id}`);
  return data;
};

export default {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
};
