import { getCookie } from "cookies-next";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postPost } from "./api";
import { useRouter } from "next/router";

const Write = (): JSX.Element => {
  const date = new Date();
  const router = useRouter();

  const [data, setData] = useState({
    title: "",
    author: `${getCookie("name")}`,
    date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(date.getDate()).padStart(2, "0")}`,
    content: "",
    views: 0,
    comments: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData({ ...data, [e.currentTarget.id]: e.currentTarget.value });
  };

  const handleSubmit = () => {
    mutate(data);
  };

  const { mutate } = useMutation({
    mutationFn: postPost,
    onError: () => alert("등록에 실패하였습니다"),
    onSuccess: () => {
      alert("글이 등록되었습니다");
      router.push("/");
    },
  });

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex w-3/4 h-full flex-col gap-2">
        <h1 className="text-xl">글 작성</h1>
        <input
          id="title"
          onChange={handleChange}
          placeholder="title"
          className="outline-none bg-gray-50 p-1 rounded-md"
        />
        <hr className="border-b-2 border-gray-100" />
        <textarea
          id="content"
          onChange={handleChange}
          placeholder="content"
          className="resize-none outline-none h-full bg-gray-50 p-1 rounded-md"
        />
        <button
          className="p-2 bg-gray-50 self-end rounded-md transition-all hover:bg-gray-100"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Write;
