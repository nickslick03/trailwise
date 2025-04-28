import Image from "next/image";
import LoginButton from "@/components/LoginBox";
import LoginPageBackgroundImage from "@/loginComponents/login_page_background_image";
import Login_Image from "@/loginComponents/login_page_logo";
   // Importing the LoginButton component

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="flex justify-center">
          <LoginButton />
        </div>

        <div className="flex items-center justify-center min-h-screen z-50">
          <LoginPageBackgroundImage />
        </div>

        <div className="flex justify-center mt-8">
          <Login_Image />
        </div>

      </main> 
    </div>
  );
}