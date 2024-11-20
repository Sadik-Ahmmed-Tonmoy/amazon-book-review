import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { Book } from '@/interface/globalType';

interface BookTableProps {
    books: Book[]; // books prop should be an array of Book
  }

const BookTable = ({ books }: BookTableProps) => {
  return (
   
      <div className="hidden xl:block">
        <table className="w-full table-auto border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="text-base font-normal border-b-1">
              <th className="py-4 text-base font-normal">Book Name</th>
              <th className="py-4 text-base font-normal">Writer Name</th>
              <th className="py-4 text-base font-normal">Date</th>
              <th className="py-4 text-base font-normal">Details</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {books.map((book, index) => (
              <tr
                key={book.id}
                className={` hover:bg-gray-100`}
              >
                <td className="px-4 py-4 text-center lg:max-w-28">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={book.image}
                      alt={book.name}
                      width={60}
                      height={90}
                      className="rounded"
                    />
                    <p className="mt-2 text-base font-normal">{book.name}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-base font-normal">{book.writer}</td>
                <td className="px-4 py-4 text-center text-base font-normal">{book.date}</td>
                <td className="px-4 py-4 text-center">
                  <Button radius='sm' className='bg-primary text-white' >
                   
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
  );
};

export default BookTable;
