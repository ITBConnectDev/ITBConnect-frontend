import { NextResponse } from "next/server";

// Redirect to home
const Success = () => {
  return NextResponse.redirect("/");
};

export default Success;
