import React from "react";

const LoginPageLogo = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-center py-4">
      <img
        src="/logo.png"
        alt="Trailwise Logo"
        className="object-contain w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] lg:w-[1000px] lg:h-[1000px]"
      />
    </div>
  );
};

export default LoginPageLogo;

