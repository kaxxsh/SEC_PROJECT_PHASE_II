import { NextResponse } from "next/server";
import dbConnection from "../../utils/db.js";
import { Tag } from "../../utils/schema.js";

dbConnection();

export async function GET(req, { params }) {
  try {
    const data = await Tag.findOne({ name: params.id }).select("track");
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
