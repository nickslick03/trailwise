"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthChecker() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await fakeAuthCheck(); // Replace with real check
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    };

    checkAuth();
  }, [router]);

  const fakeAuthCheck = async () => {
    // Simulate a real check here (use cookies, localStorage, API, etc.)
    return false; // ← Set to true temporarily if you don't want redirect during testing
  };

  return null;
}


