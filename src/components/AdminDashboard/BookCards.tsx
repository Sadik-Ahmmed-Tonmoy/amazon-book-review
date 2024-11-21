import Image from "next/image";
import { Button } from "@nextui-org/react";
import { TBooksAndMembers } from "@/interface/globalType";
import { cn } from "@/lib/utils";

interface BookTableProps {
  books: TBooksAndMembers[]; // books prop should be an array of Book
  className?: string;
}

const BookCards = ({ books, className }: BookTableProps) => {
  return (
    <div className={cn("  grid  gap-3 xl:hidden p-4", className)}>
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
        >
          {/* Book Image */}
          <div className="w-full h-">
            <Image
              src={book.image}
              alt={book.name}
              width={100}
              height={400}
              className="rounded-t-lg h-full w-full object-cover"
            />
          </div>

          {/* Book Info */}
          <div className="p-4 flex flex-col justify-between flex-grow">
            <h3 className="text-lg font-semibold text-center">{book.name}</h3>
            {book?.writer && (
              <p className="text-sm text-center text-gray-600">
                {book?.writer}
              </p>
            )}
            <p className="text-sm text-center text-gray-500">{book.date}</p>

            {/* View Button */}
            <div className="mt-4 text-center">
              <Button radius="sm" className="bg-primary text-white">
                View
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCards;
