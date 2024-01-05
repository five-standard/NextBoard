import axios from "axios";

export const getPosts = async () => {
  const res = await axios.get("http://localhost:8080/posts");
  const { data } = res;
  return data;
};

export const postLogin = async (data: any) => {
  return await axios.post("http://localhost:8080/login", data);
};

export const getPost = async (id: string) => {
  const res = await axios.get(`http://localhost:8080/posts/${id}`);
  const { data } = res;
  return data;
};

export const postPost = async (data: any) => {
  return await axios.post("http://localhost:8080/posts", data);
};

export const patchViews = async (id: string, before: number) => {
  return await axios.patch(`http://localhost:8080/posts/${id}`, {
    views: before + 1,
  });
};

export const patchComments = async (comment: any) => {
  return await axios.patch(`http://localhost:8080/posts/${id}`, {
    comments: comment,
  });
};
