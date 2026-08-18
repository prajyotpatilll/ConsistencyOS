import api from "./api";

const getDashboard = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};

export default { getDashboard };
