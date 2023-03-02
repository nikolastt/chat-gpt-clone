"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

function Login() {
  return (
    <div className="bg-[#11a37f] h-screen flex flex-col items-center justify-center text-center">
      <Image
        width={300}
        height={300}
        alt="logo"
        src="https://links.papareact.com/2i6"
      />
      <button
        onClick={() => signIn("google")}
        className="text-white font-bold text-3xl animate-pulses"
      >
        Sign In use ChatGPT
      </button>
    </div>
  );
}

export default Login;
