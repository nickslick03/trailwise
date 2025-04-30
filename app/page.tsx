"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

import LoginButton from "@/components/LoginBox";
import LoginPageBackgroundImage from "@/loginComponents/login_page_background_image";
import Login_Image from "@/loginComponents/login_page_logo";

export default function Home() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = false; // Replace with real auth check
      if (isLoggedIn) {
        router.push("/dashboard");
      } else {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [router]);

  if (!authChecked) return null;

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-100">
        <main className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden h-[90vh] relative">
          {/* Background Image inside app frame */}
          <LoginPageBackgroundImage />

          {/* Logo */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 w-[200px] h-[200px]">
            <Login_Image />
          </div>

          {/* Centered Login Form */}
          <div className="z-50 relative flex flex-col items-center justify-center h-full mt-[60px] px-4">
            <LoginButton />
          </div>
        </main>
      </div>
    </>
  );
}
