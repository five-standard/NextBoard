import { deleteCookie } from "cookies-next";
import useUserInfo from "@/hooks/useUserInfo";
import Link from "next/link";
import useSearchData from "../hooks/useSearchData";
import React, { HTMLInputTypeAttribute } from "react";

export const Header = () => {
  const { info, delInfo } = useUserInfo();
  const { data, setData } = useSearchData();
  let timer: any;

  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("name");
    delInfo();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setData(value);
    }, 200);
  };

  return (
    <div className="flex justify-between items-center gap-5 pl-10 pr-10 w-full h-10 bg-gray-300">
      <div className="flex items-center gap-3">
        <Link href="/">Home</Link>
        {info.token && <Link href="/write">Write</Link>}
        <input
          placeholder="Search"
          onChange={handleChange}
          className="w-[3.8rem] h-5 rounded-md p-2 border-spacing-0 outline-0 text-sm transition-all ease-in-out duration-300 focus:w-60 placeholder:text-sm"
        />
      </div>
      {info.token ? (
        <div className="flex items-center">
          <h1>{info.name}</h1>
          <h1>┃</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};
