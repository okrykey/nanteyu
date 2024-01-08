import Link from "next/link";
import { Suspense } from "react";
import { getUser } from "@/lib/clerk";
import Chat from "@/components/chat";
import Examples from "@/components/examples";
import Trends from "@/components/trends";
import Loading from "./loading";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="m-4">
      <h1 className="text-5xl font-bold text-center my-4">Nanteyu</h1>
      <div className="mb-4 flex justify-end">
        <p className="mt-4 text-xl font-semibold">
          Hello！
          {user ? (
            <Link
              href="/account"
              className="text-purple-500 hover:border-b-2 hover:border-b-purple-500 "
            >
              {user.username}
            </Link>
          ) : (
            <span className="text-orange-400">ゲスト</span>
          )}
        </p>
      </div>

      <Chat />
      <div className="my-4">
        <Suspense fallback={<Loading />}>
          <Trends />
        </Suspense>
        <Examples></Examples>
      </div>
    </div>
  );
}
