import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { setSearch, setShowSearch } from "../redux/shopSlice"; // Assuming your slice file is named shopSlice

const ShowSearch = () => {
  const dispatch = useDispatch();
  const { search, showSearch } = useSelector((state) => state.shop); // Access the state from redux
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value)); // Dispatch action to update search
  };

  return showSearch && visible ? (
    <div className="py-4 pb-7">
      <div className="text-center">
        <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white overflow-hidden w-full">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search here..."
            className="border-none outline-none w-full bg-white text-sm"
          />
          <div className="bg-white text-center">
            <FaSearch className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ShowSearch;
