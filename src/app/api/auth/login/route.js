import { NextResponse } from "next/server";
import { authUser } from "../../utils/schema.js";
import { jwtGenrator } from "../../utils/jwt.js";
import dbConnection from "../../utils/db.js";
import comparePassword from "../../utils/passCompare.js";

dbConnection();
export async function POST(req) {
  try {
    const { Id, Password } = await req.json();
    if (!Id || !Password) {
      return NextResponse.json(
        { message: "Id or Password is missing" },
        { status: 400 }
      );
    }
    const User = await authUser.findOne({ id: Id });
    if (!User) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (Password !== User.password) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 400 }
      );
    }
    const token = await jwtGenrator({
      User: User._id,
      Location: User.location,
    });
    const response = NextResponse.json(
      { message: "Logged in Succesfully!" },
      { status: 200 }
    );
    response.cookies.set("token", User.location);
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
