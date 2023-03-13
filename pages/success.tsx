import { NextPage } from "next";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { useEffect } from "react";

// Redirect to home
const Success: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  });
  return <h1>Please wait while you&apos;re being redirected</h1>;
};

export default Success;
