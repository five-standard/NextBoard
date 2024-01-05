import {
  HydrationBoundary,
  useQuery,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { getPost, patchViews } from "../api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { DehydratedState } from "react-query";

interface DetailType {
  dehydratedState: DehydratedState;
}

export async function getServerSideProps(context: any) {
  const queryClient = new QueryClient();
  const { params } = context;

  await queryClient.prefetchQuery({
    queryKey: ["post", params.id],
    queryFn: () => getPost(params.id),
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

  const { data } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id as unknown as string),
  });

  useEffect(() => {
    patchViews(id as unknown as string, data.views);
  });

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-4/5 flex-col gap-10">
        <div className="flex w-full flex-col">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">{data?.title}</h1>
            <h2 className="text-lg">
              {data?.author}┃{data?.date}┃조회 {data?.views + 1}
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
          />
          <ul>
            {data?.comments.map((i: any) => {
              return (
                <li key={i.id}>
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
