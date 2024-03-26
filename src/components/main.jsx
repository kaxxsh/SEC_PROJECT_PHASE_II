"use client";
import React, { useState } from "react";

const Main = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/tag/${search}`, {
        cache: "no-store",
        method: "GET",
      });
      const responseData = await response.json();
      setData(responseData.data.track); // Assuming responseData.data.track is the array you want to set
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="text-3xl font-bold mb-4 text-center">SKYCARGOGARD</div>
      <div className="text-lg mb-4 text-center">SEARCH YOUR BAG</div>
      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ENTER YOUR TRAVEL ID"
          className="w-3/4 border border-gray-300 px-4 py-2 rounded-l focus:outline-none focus:border-blue-500"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r cursor-pointer"
          onClick={handleSearch}
        >
          SEARCH
        </button>
      </div>
      {data.length > 0 ? (
        <div className="text-center">
          {data.map((item, index) => (
            <div className="bg-gray-100 rounded-md p-4 my-2" key={index}>
              <div className="text-sm">Status: {item}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">No data found</div>
      )}
    </div>
  );
};

export default Main;
