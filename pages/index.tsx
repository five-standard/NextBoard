import { PostData } from "@/components/posts";
import {
  HydrationBoundary,
  useQuery,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getPosts } from "@/pages/api/index";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Posts() {
  const { data } = useQuery({ queryKey: ["posts"], queryFn: getPosts });

  return (
    <div className="flex w-full justify-center">
      <div className="w-10/12 border-gray-950 border-t-[1px] border-b-[1px]">
        <div className="grid grid-cols-[70fr_30fr] w-full p-2 border-t-[1px] border-b-[1px] bg-gray-100 border-gray-950">
          <h1 className="place-self-center">제목</h1>
          <div className="grid grid-cols-[3fr_3fr_2fr] gap-3">
            <h1 className="place-self-center">작성자</h1>
            <h1 className="place-self-center">작성일</h1>
            <h1 className="place-self-center">조회</h1>
          </div>
        </div>
        {data?.map(
          (i: {
            id: number;
            title: string;
            author: string;
            date: string;
            views: number;
          }) => {
            return (
              <PostData
                key={i.id}
                title={i.title}
                author={i.author}
                date={i.date}
                views={i.views}
                id={i.id}
              />
            );
          },
        )}
      </div>
    </div>
  );
}

export default function Home({ dehydratedState }: any) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  );
}
