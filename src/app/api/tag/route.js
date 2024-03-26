import { NextResponse } from "next/server";
import dbConnection from "../utils/db.js";
import { Tag } from "../utils/schema.js";

dbConnection();

export async function POST(req) {
  const { name, address, contact, ticket, from, to } = await req.json();
  try {
    await Tag.create({
      name: name,
      address: address,
      mail: contact.mail,
      phone: contact.phone,
      ticket: ticket,
      from: from,
      to: to,
      track: ["chennai"],
    });
    return NextResponse.json({ message: "Created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  const { ID, track } = await req.json();
  try {
    const data = await Tag.findOne({ name: ID });
    if (!data) {
      return NextResponse.json({ message: "ID not found" }, { status: 404 });
    }
    const log = data.track;
    log.push(track);
    try {
      await Tag.findOneAndUpdate({ name: ID }, { track: log }, { new: true });
      return NextResponse.json({ message: "UPDATED" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Failed to update" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
