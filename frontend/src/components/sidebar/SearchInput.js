import { FiSearch } from "react-icons/fi";

const SearchInput = ({ searchKeyword, searchKeywordHandler }) => {
  return (
    <div className="flex items-center  my-3 px-5 w-full ">
      <input
        type="text"
        onChange={searchKeywordHandler}
        value={searchKeyword}
        placeholder="Search..."
        className="py-[8px] text-left text-white outline-none border-none rounded-l-lg px-4 flex-grow bg-slate-300 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30"
      />
      <div className="text-white text-2xl py-[8px] w-8  rounded-r-lg bg-slate-300 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
        <FiSearch className="text-center" />
      </div>
    </div>
  );
};

export default SearchInput;
