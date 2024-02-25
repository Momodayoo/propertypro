import { create } from "apisauce";

const createBlogApi = () => {
  const api = create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // user methods
  const getUsers = () => api.get("/users");
  const getUser = (id) => api.get(`/users/${id}`);
  const createUser = (user) => api.post("/users", user);

  // post methods
  const getPosts = () => api.get("/posts");

  return {
    getUsers,
    getUser,
    getPosts,
    createUser,
    setHeaders: api.setHeaders,
  };
};

export default createBlogApi;
