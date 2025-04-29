import Image from "next/image";
import LoginButton from "@/components/LoginBox";
import LoginPageBackgroundImage from "@/loginComponents/login_page_background_image";
import Login_Image from "@/loginComponents/login_page_logo";
import AuthChecker from "@/loginComponents/auth_checker"; // Importing the AuthChecker component
// Importing the LoginButton component

export default function Home() {
  return (
    
    <>
      <AuthChecker /> {/*Runs before anything else to check auth */}
    <main className="flex flex-col items-center justify-between h-screen bg-gradient-to-b from-gray-900 to-gray-800">

      <div className="flex flex-col items-center justify-center z-50">
        <Login_Image />
        <LoginButton />
      </div>

      <div className="flex items-center justify-center flex-grow z-0">
        <LoginPageBackgroundImage />
      </div>
    </main>
    </>
  );
}
