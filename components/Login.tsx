"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
        <Image
            src = "https://links.papareact.com/2i6"
            width={300}
            height={300}
            alt="logo"
        />
        <button
            onClick={() => signIn("google")}
            className=" text-black font-bold text-2xl animate-pulse border border-black border-solid rounded-lg py-2 px-4">
            Sign In to ChatGPT
      </button>
      <p className="mt-20 italic text-[#0f2821] hover:animate-bounce">Developed by Pradaap!</p>
    </div>
  );
}

export default Login;
