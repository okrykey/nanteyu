import { UserProfile } from "@clerk/nextjs";

export default async function Account() {
  return (
    <div>
      <UserProfile />
    </div>
  );
}
