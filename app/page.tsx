import Image from "next/image";
import LoginButton from "@/components/LoginBox";  // Importing the LoginButton component

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="flex justify-center">
          <LoginButton />
        </div>
      </main> 
    </div>
  );
}