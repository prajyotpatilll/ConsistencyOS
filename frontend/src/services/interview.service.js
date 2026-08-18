import api from "./api";

const getPreparations = async () => {
  const { data } = await api.get("/interview");
  return data.preparations;
};

const createPreparation = async (preparation) => {
  const { data } = await api.post("/interview", preparation);
  return data.preparation;
};

const updatePreparation = async (id, updates) => {
  const { data } = await api.put(`/interview/${id}`, updates);
  return data.preparation;
};

const deletePreparation = async (id) => {
  const { data } = await api.delete(`/interview/${id}`);
  return data;
};

export default {
  getPreparations,
  createPreparation,
  updatePreparation,
  deletePreparation,
};
