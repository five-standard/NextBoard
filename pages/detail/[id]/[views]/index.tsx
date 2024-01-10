import {
  HydrationBoundary,
  useQuery,
  dehydrate,
  QueryClient,
  DehydratedState,
  useMutation,
} from "@tanstack/react-query";
import { getPost, patchComments, patchViews } from "../../../api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

interface DetailType {
  dehydratedState: DehydratedState;
}

const queryClient = new QueryClient();

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { id, views } = params;

  patchViews(id as unknown as string, Number(views));

  await queryClient.prefetchQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function DetailComponent() {
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id as unknown as string),
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };

  const { mutate } = useMutation({
    mutationFn: () =>
      patchComments(
        [...data.comments, { author: getCookie("name"), content: comment }],
        id,
      ),

    onError: (error, variable, rollback) => {
      console.log(error);
    },
    onSettled: () => {
      refetch();
    },
  });

  const handleSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.shiftKey && e.code === "Enter") {
      if (!getCookie("accessToken")) {
        alert("로그인이 필요합니다");
        router.push("/login");
        return;
      }
      e.preventDefault();
      mutate();
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-4/5 flex-col gap-10">
        <div className="flex w-full flex-col">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">{data?.title}</h1>
            <h2 className="text-lg">
              {data?.author}┃{data?.date}┃조회 {data?.views}
            </h2>
            <hr className="border-gray-600 border-[1px]" />
          </div>
          <h1 className="whitespace-pre-wrap break-words">{data?.content}</h1>
        </div>

        <div className="flex flex-col gap-2">
          <textarea
            rows={3}
            placeholder="Comments"
            className="border-gray-950 p-1.5 box-border rounded-md border-2 resize-none"
            onChange={handleChange}
            onKeyDown={handleSubmit}
          />
          <ul>
            {data?.comments.map((i: any, j: number) => {
              return (
                <li className="whitespace-pre-wrap break-words" key={j}>
                  <span className="font-bold">{i.author}</span> - {i.content}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

const Detail = ({ dehydratedState }: DetailType) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <DetailComponent />
    </HydrationBoundary>
  );
};

export default Detail;
