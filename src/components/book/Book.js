import React, { useState } from "react";
import "./book.css"; // Assuming you have some CSS for styling

import { HiOutlineCursorClick } from "react-icons/hi";

const Book = ({ name, age, message }) => {
  const [selectedPage, setSelectedPage] = useState("page-1");

  const handlePageChange = (e) => {
    setSelectedPage(e.target.id);
  };

  return (
    <div className="book">
      <input
        type="radio"
        name="page"
        id="page-1"
        checked={selectedPage === "page-1"}
        onChange={handlePageChange}
      />
      <label className="page cover" htmlFor="page-3">
        <div className=" py-2 px-10 mt-10 flex flex-col justify-center text-center items-center min-h-full">
          <h2 className="text-center text-[43px] font-bold leading-[50px] capitalize">
            Happy birthday
          </h2>
          <h2 className="text-center text-[55px] mt-8 font-bold leading-[65px] capitalize ">
            {name}
          </h2>
          <button className="absolute right-5 bottom-5 inline-flex  items-center gap-2 text-lg uppercase font-semibold">
            Click here <HiOutlineCursorClick className="text-xl" />
          </button>
        </div>
      </label>
      <label className="page cover" htmlFor="page-1">
        <div className="flex items-center justify-center min-h-full">
          <p className="text-xl text-center font-semibold">{message}</p>
        </div>
      </label>

      <input
        type="radio"
        name="page"
        id="page-3"
        checked={selectedPage === "page-3"}
        onChange={handlePageChange}
      />
      <label className="page" htmlFor="page-5">
        <h2 className="text-[65px] font-bold mt-16">Blow!!</h2>
        <h2 className="mt-8 text-xl">(For a surprise)</h2>
        {selectedPage === "page-3" && (
          <iframe
            src="/cake.html"
            title="Cake Animation"
            style={{
              width: "100%",
              height: "500px",
              border: "none",
              marginTop: 10,
            }}
          />
        )}
        <input
          type="radio"
          name="page"
          id="page-5"
          checked={selectedPage === "page-5"}
          onChange={handlePageChange}
          className="text-black absolute bottom-0 right-0 w-full bg-red-500"
        ></input>
      </label>
      <label className="page" htmlFor="page-3">
        <p className="text-black">{message}</p>
      </label>

      <input
        type="radio"
        name="page"
        id="page-5"
        checked={selectedPage === "page-5"}
        onChange={handlePageChange}
      />
      <label className="page" htmlFor="page-7">
        {/* <p>{message}</p> */}
      </label>
      <label className="page" htmlFor="page-5">
        {/* Add any other content for page 5 */}
      </label>

      <input
        type="radio"
        name="page"
        id="page-9"
        checked={selectedPage === "page-9"}
        onChange={handlePageChange}
      />
      <label className="page cover" htmlFor="page-7"></label>
      <label className="page cover" htmlFor="page-9"></label>

      {/* You can add more pages here if needed */}
    </div>
  );
};

export default Book;
