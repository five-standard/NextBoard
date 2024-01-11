import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "./api";
import { setCookie } from "cookies-next";
import useUserInfo from "@/hooks/useUserInfo";

const Register = () => {
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    passcheck: "",
  });
  const { setInfo } = useUserInfo();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.currentTarget.id]: e.currentTarget.value });
  };

  const handleSubmit = () => {
    mutate(data);
  };

  const { mutate } = useMutation({
    mutationFn: postRegister,
    onError: () => alert("회원가입에 실패했습니다"),
    onSuccess: (result) => {
      const { data } = result;
      setCookie("accessToken", data.accessToken);
      setCookie("name", data.user.name);
      setInfo({
        token: data.accessToken,
        name: data.user.name,
      });
      router.push("/");
    },
  });

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="grid grid-rows-[1fr_3fr_1fr] w-1/3 h-3/6 border-gray-950 border-[1px] rounded-md">
        <h1 className="text-2xl place-self-center">Register</h1>
        <div className="flex flex-col directon gap-3 place-self-center">
          <input
            placeholder="이메일"
            className="w-80 h-10 rounded-md p-2 border-spacing-0 outline-0 text-sm bg-gray-100 placeholder:text-sm"
            id="email"
            onChange={handleChange}
          />
          <input
            placeholder="계정명"
            className="w-80 h-10 rounded-md p-2 border-spacing-0 outline-0 text-sm bg-gray-100 placeholder:text-sm"
            id="name"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-80 h-10 rounded-md p-2 border-spacing-0 outline-0 text-sm bg-gray-100 placeholder:text-sm"
            id="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-80 h-10 rounded-md p-2 border-spacing-0 outline-0 text-sm bg-gray-100 placeholder:text-sm"
            id="passcheck"
            onChange={handleChange}
          />
          <button
            className="w-80 h-10 rounded-md bg-gray-300"
            onClick={handleSubmit}
          >
            회원가입
          </button>
          <div className="flex self-center">
            <Link
              href="/login"
              className="text-gray-400 transition-all hover:text-gray-500"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
