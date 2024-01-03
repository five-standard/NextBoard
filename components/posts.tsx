import Link from "next/link";

type Props = {
  title: string;
  author: string;
  date: string;
  views: number;
  id: number;
};

export const PostData = ({ title, author, date, views, id }: Props) => {
  return (
    <Link
      href={`/detail/${id}`}
      className="grid grid-cols-[70fr_30fr] w-full p-2 border-t-[0.5px] border-b-[0.5px] border-gray-950 cursor-pointer"
    >
      {title}
      <div className="grid grid-cols-[3fr_3fr_2fr] gap-3">
        <h1 className="place-self-center">{author}</h1>
        <h1 className="place-self-center">{date}</h1>
        <h1 className="place-self-center">{views}</h1>
      </div>
    </Link>
  );
};
