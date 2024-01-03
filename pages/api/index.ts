import axios from "axios";

interface GetPostType {
  id: number;
}

export const getPosts = async () => {
  const res = await axios.get("http://localhost:8080/posts");
  const { data } = res;
  return data;
};

export const postLogin = async (data: any) => {
  return await axios.post("http://localhost:8080/login", data);
};

export const getPost = async ({ id }: GetPostType) => {
  const res = await axios.get(`http://localhost:8080/posts/${id}`);
};
