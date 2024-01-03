import {
  HydrationBoundary,
  useQuery,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const Detail = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-4/5 flex-col gap-10">
        <div className="flex w-full flex-col">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl">Hello World!</h1>
            <h2 className="text-lg">Hello_World┃2024-01-02</h2>
            <hr className="border-gray-600 border-[1px]" />
          </div>
          <h1 className="whitespace-pre-wrap break-words">this is content</h1>
        </div>

        <div className="flex flex-col gap-2">
          <textarea
            rows={3}
            placeholder="Comments"
            className="border-gray-950 p-1.5 box-border rounded-md border-2 resize-none"
          />
          <h1>test</h1>
        </div>
      </div>
    </div>
  );
};

export default Detail;
