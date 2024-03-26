import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const jwtGenrator = async (payload) => {
  const { User, Location } = payload; // Extracting User and Location from payload
  const alg = "HS256";
  return await new SignJWT({ User, Location }) // Including User and Location in JWT payload
    .setProtectedHeader({ alg })
    .setExpirationTime(process.env.JWT_EXPIRE)
    .setIssuedAt()
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

const jwtVerifier = async (token) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
  } catch (error) {
    console.log(error);
    cookies().delete("token");
    return null; // or handle the error as required
  }
};

export { jwtGenrator, jwtVerifier };
