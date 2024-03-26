"use client";
import React, { useState, useEffect } from "react";
import userId from "@/components/userId";

const Pannel = () => {
  const [select, setSelect] = useState(0);
  const [ID, setID] = useState("");
  const [Data, setData] = useState({
    name: "",
    address: "",
    contact: {
      mail: "",
      phone: "",
    },
    ticket: "",
    from: "",
    to: "",
  });
  const [nfcAvailable, setNfcAvailable] = useState(false);

  useEffect(() => {
    // Check if Web NFC API is supported
    if ("NDEFReader" in window) {
      setNfcAvailable(true);
    } else {
      setNfcAvailable(false);
    }
  }, []);

  const handleWrite = async () => {
    try {
      if (!nfcAvailable) {
        console.error("NFC is not available");
        const response = await fetch("/api/tag", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        });
        if (response.ok) {
          console.log("Data written to NFC tag and saved to the database");
        } else {
          console.error(
            "Failed to write data to NFC tag or save to the database"
          );
        }
        return;
      }

      // Perform NFC tag writing
      const writer = new window.NDEFReader();
      const message = [
        new NDEFRecord({
          recordType: "mime",
          mediaType: "application/json",
          data: JSON.stringify(Data),
        }),
      ];
      await writer.write(message);

      // Send data to backend for storage
      const response = await fetch("/api/tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });
      if (response.ok) {
        console.log("Data written to NFC tag and saved to the database");
      } else {
        console.error(
          "Failed to write data to NFC tag or save to the database"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckIn = async () => {
    const id = await userId();
    try {
      if (!nfcAvailable) {
        const response = await fetch("/api/tag", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ID: ID, track: id }),
        });
        if (response.ok) {
          console.log("Checked in successfully");
        } else {
          console.error("Failed to check in");
        }
        return;
      }
      // Perform NFC reading
      const reader = new window.NDEFReader();
      reader.scan().then(async ({ message }) => {
        const record = message.records[0];
        const parsedData = JSON.parse(new TextDecoder().decode(record.data));
        // Call backend API for check-in
        const response = await fetch("/api/tag", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ID: ID, track: id }),
        });
        if (response.ok) {
          console.log("Checked in successfully");
        } else {
          console.error("Failed to check in");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckOut = async () => {
    const id = await userId();
    console.log(id);
    try {
      if (!nfcAvailable) {
        const response = await fetch("/api/tag", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ID: ID, track: id }),
        });
        if (response.ok) {
          console.log("Checked out successfully");
        } else {
          console.error("Failed to check out");
        }
        return;
      }
      // Perform NFC reading
      const reader = new window.NDEFReader();
      reader.scan().then(async ({ message }) => {
        const record = message.records[0];
        const parsedData = JSON.parse(new TextDecoder().decode(record.data));
        // Call backend API for check-out
        const response = await fetch("/api/tag", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ID: ID, track: id }),
        });
        if (response.ok) {
          console.log("Checked out successfully");
        } else {
          console.error("Failed to check out");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <div className="mb-4">
          <div className="font-bold text-xl mb-2">MENU</div>
          <div className="flex flex-col">
            <div
              className={`cursor-pointer py-2 ${
                select === 0 ? "bg-gray-600" : ""
              }`}
              onClick={() => setSelect(0)}
            >
              ENTRY
            </div>
            <div
              className={`cursor-pointer py-2 ${
                select === 1 ? "bg-gray-600" : ""
              }`}
              onClick={() => setSelect(1)}
            >
              CHECK-IN
            </div>
            <div
              className={`cursor-pointer py-2 ${
                select === 2 ? "bg-gray-600" : ""
              }`}
              onClick={() => setSelect(2)}
            >
              CHECK-OUT
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4 bg-gradient-to-r from-blue-300 to-blue-500 p-4">
        <div>
          {select === 0 && (
            <div>
              <div className="font-bold text-xl mb-2">ENTRY</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <div className="mb-2">NAME</div>
                  <input
                    className="input-field"
                    type="text"
                    value={Data.name}
                    onChange={(e) => setData({ ...Data, name: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <div className="mb-2">ADDRESS</div>
                  <input
                    className="input-field"
                    type="text"
                    value={Data.address}
                    onChange={(e) =>
                      setData({ ...Data, address: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <div className="mb-2">CONTACT</div>
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <div className="mb-2">MAIL</div>
                      <input
                        className="input-field"
                        type="text"
                        value={Data.contact.mail}
                        onChange={(e) =>
                          setData({
                            ...Data,
                            contact: {
                              ...Data.contact,
                              mail: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <div className="mb-2">PHONE NUMBER</div>
                      <input
                        className="input-field"
                        type="text"
                        value={Data.contact.phone}
                        onChange={(e) =>
                          setData({
                            ...Data,
                            contact: {
                              ...Data.contact,
                              phone: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="mb-2">TICKET</div>
                  <input
                    className="input-field"
                    type="text"
                    value={Data.ticket}
                    onChange={(e) =>
                      setData({ ...Data, ticket: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <div className="mb-2">FROM</div>
                  <input
                    className="input-field"
                    type="text"
                    value={Data.from}
                    onChange={(e) => setData({ ...Data, from: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <div className="mb-2">TO</div>
                  <input
                    className="input-field"
                    type="text"
                    value={Data.to}
                    onChange={(e) => setData({ ...Data, to: e.target.value })}
                  />
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleWrite}
              >
                CLICK TO WRITE
              </button>
            </div>
          )}
          {select === 1 && (
            <div>
              <div className="font-bold text-xl mb-2">CHECK-IN</div>
              <div className="mb-4">
                <div className="mb-2">ID</div>
                <input
                  className="input-field"
                  type="text"
                  value={ID}
                  onChange={(e) => setID(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCheckIn}
              >
                CLICK TO CHECK-IN
              </button>
            </div>
          )}
          {select === 2 && (
            <div>
              <div className="font-bold text-xl mb-2">CHECK-OUT</div>
              <div className="mb-4">
                <div className="mb-2">ID</div>
                <input
                  className="input-field"
                  type="text"
                  value={ID}
                  onChange={(e) => setID(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCheckOut}
              >
                CLICK TO CHECK-OUT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pannel;
