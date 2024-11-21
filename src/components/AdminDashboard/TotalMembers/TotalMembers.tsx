"use client";

import { TBooksAndMembers } from "@/interface/globalType";
import BookCards from "../BookCards";
import BookTable from "../BookTable";
import MemberTable from "../MemberTable";

interface BookTableProps {
  books: TBooksAndMembers[];
  title: string;
}

const TotalMembers = ({ books, title }: BookTableProps) => {
  return (
    <div className="space-y-6 ">
      <div className="bg-white sm:px-6 rounded-lg   ">
        <div className="border-b py-3 md:py-5 px-4">
          <p>Members list</p>
        </div>
        <div className="flex items-center justify-between border-b py-3 md:py-5 px-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p>{books?.length}</p>
        </div>
        <div className=" ">
          <MemberTable books={books} />
          <BookCards books={books} />
        </div>
      </div>
    </div>
  );
};

export default TotalMembers;
