import { NextResponse } from "next/server";
import dbConnection from "../../utils/db.js";
import { authUser } from "../../utils/schema.js";

dbConnection();
export async function POST(req) {
  try {
    const { Id, Password, Location } = await req.json();
    if (!Id || !Password || !Location) {
      return NextResponse.json(
        { message: "Password or Password or Id is missing" },
        { status: 400 }
      );
    }
    try {
      await authUser.create({
        id: Id,
        password: Password,
        location: Location,
      });
    } catch (error) {
      console.log(error);
    }
    return NextResponse.json({ message: "User Created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
