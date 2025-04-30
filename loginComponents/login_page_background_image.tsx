import Image from "next/image";

const LoginPageBackgroundImage = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src="/mountain2.png"
        alt="Trailwise Background"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};

export default LoginPageBackgroundImage;

