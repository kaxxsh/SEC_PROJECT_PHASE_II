"use server";

import { cookies } from "next/headers";

const userId = async () => {
  const { value } = cookies().get("token") || {};
  return value;
};

export default userId;
