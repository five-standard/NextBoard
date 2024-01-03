const Write = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex w-3/4 h-full flex-col gap-2">
        <h1 className="text-xl">글 작성</h1>
        <input
          placeholder="title"
          className="outline-none bg-gray-50 p-1 rounded-md"
        />
        <hr className="border-b-2 border-gray-100" />
        <textarea
          placeholder="content"
          className="resize-none outline-none h-full bg-gray-50 p-1 rounded-md"
        />
        <button className="p-2 bg-gray-50 self-end rounded-md transition-all hover:bg-gray-100">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Write;
