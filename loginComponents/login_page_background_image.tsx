import Image from "next/image";

const LoginPageBackgroundImage = () => {
  return (
    <div className="fixed inset-0 -z-10">
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

