import React, { useState } from "react";
import "./book.css"; // Assuming you have some CSS for styling
import Cake from "../cake/Cake";

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
        <div className="bg--300 py-2 px-10 mt-20">
          <h2 className="text-center text-[45px] font-bold">Happy birthday </h2>
          <h2 className="text-center text-[65px] mt-14 font-bold ">{name}</h2>
        </div>
      </label>
      <label className="page cover" htmlFor="page-1"></label>

      <input
        type="radio"
        name="page"
        id="page-3"
        checked={selectedPage === "page-3"}
        onChange={handlePageChange}
      />
      <label className="page" htmlFor="page-5">
        <h2 className="text-[50px] font-bold mt-5">Blow!!</h2>
        <h2 className="mt-5 text-xl">(For a surprise)</h2>
        <h3 className="mt-2 text-center">click on flame to blow candle</h3>
        {/* Conditionally render Cake component only on page 3 */}
        {selectedPage === "page-3" && (
          <div className="ml-48 mt-56">
            <Cake />
          </div>
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
        {/* Add any other content for page 3 */}
      </label>

      <input
        type="radio"
        name="page"
        id="page-5"
        checked={selectedPage === "page-5"}
        onChange={handlePageChange}
      />
      <label className="page" htmlFor="page-7">
        <p>{message}</p>
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
