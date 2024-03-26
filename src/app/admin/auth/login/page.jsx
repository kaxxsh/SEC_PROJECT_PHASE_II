"use client";
import React, { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [credentials, setCredentials] = useState({ id: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      cache: "no-store",
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        Id: credentials.id,
        Password: credentials.password,
      }),
    });
    const data = await response.json();
    if (response.status > 399 && response.status < 499) {
      toast.error(data?.message);
    } else {
      toast.success(data?.message);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
      <div className="w-1/3 bg-gray-800 text-white p-8 rounded-md shadow-lg">
        <h1 className="text-3xl font-semibold mb-6">Login</h1>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="id">
            ID
          </label>
          <input
            id="id"
            className="input-field w-full text-black" // Set text color to black
            type="text"
            value={credentials.id}
            onChange={(e) =>
              setCredentials({ ...credentials, id: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="input-field w-full text-black" // Set text color to black
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogin}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
