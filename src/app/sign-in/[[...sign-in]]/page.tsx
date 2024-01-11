import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex flex-col items-center">
      <SignIn redirectUrl={"/"} />
    </div>
  );
};

export default Page;
