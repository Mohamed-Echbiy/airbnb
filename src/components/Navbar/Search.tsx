"use client ";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  return (
    <div className='boder-[1px] w-full py-2 md:w-auto rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer'>
      <div className='flex flex-row items-center justify-between'>
        <div className='text-sm font-semibold px-6'>Anywhere</div>
        <div className='hidden text-sm sm:block border-x-[1px] flex-1 text-center font-semibold px-6'>
          Any week
        </div>
        <div className='text-sm pl-6 pr-6 text-gray-600 flex flex-row items-center gap-3'>
          <div className='hidden sm:block'>add Guest</div>
          <div className='p-2 bg-rose-500 rounded-full text-white'>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
