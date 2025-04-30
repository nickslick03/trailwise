"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LoginButton from "@/components/LoginBox";
import LoginPageBackgroundImage from "@/loginComponents/login_page_background_image";
import Login_Image from "@/loginComponents/login_page_logo";

export default function Home() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = false; // Replace with your real auth check
      if (isLoggedIn) {
        router.push("/dashboard"); // or wherever
      } else {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [router]);

  if (!authChecked) return null;

  return (
    <>
      <LoginPageBackgroundImage />

      <div className="relative min-h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
        {/* Logo */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-40 w-[200px] h-[200px]">
          <Login_Image />
        </div>

        {/* Login Box */}
        <div className="z-50">
          <LoginButton />
        </div>
      </div>
    </>
  );
}
