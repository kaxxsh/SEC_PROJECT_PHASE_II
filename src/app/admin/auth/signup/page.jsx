"use client";
import React, { useState } from "react";
import { toast } from "sonner";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    id: "",
    password: "",
    location: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/signup", {
      cache: "no-store",
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        Id: credentials.id,
        Password: credentials.password,
        Location: credentials.location,
      }),
    });
    const data = await response.json();
    if (response.status > 399 && response.status < 499) {
      toast.error(data?.message, { autoClose: 3000 });
    } else {
      toast.success(data?.message, { autoClose: 1000 });
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
      <div className="w-1/3 bg-gray-800 text-white p-8 rounded-md shadow-lg">
        <h1 className="text-3xl font-semibold mb-6">Signup</h1>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="signup-id">
            ID
          </label>
          <input
            id="signup-id"
            className="input-field w-full text-black bg-white" // Set text color to black and background color to white
            type="text"
            value={credentials.id}
            onChange={(e) =>
              setCredentials({ ...credentials, id: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
            className="input-field w-full text-black bg-white" // Set text color to black and background color to white
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="signup-location">
            Location
          </label>
          <input
            id="signup-location"
            className="input-field w-full text-black bg-white" // Set text color to black and background color to white
            type="text"
            value={credentials.location}
            onChange={(e) =>
              setCredentials({ ...credentials, location: e.target.value })
            }
          />
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSignup}
          >
            SIGNUP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
