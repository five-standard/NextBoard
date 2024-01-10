import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Header } from "@/components/header";
import useUserInfo from "@/hooks/useUserInfo";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());
  const { setInfo } = useUserInfo();

  useEffect(() => {
    setInfo({
      token: getCookie("accessToken"),
      name: getCookie("name"),
    });
  }, []);

  return (
    <div className="grid grid-rows-[1fr_98fr_1fr] gap-5 h-screen">
      <Header />
      <div>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
      <div className="flex pl-10 pr-10 items-center w-full h-10 bg-gray-300">
        Made with NextJS
      </div>
    </div>
  );
}
