import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./Loading";
import Chat from "@/components/ui/Chat";
import { getUser } from "@/lib/clerk";
import Languages from "@/components/ui/Languages";

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
              {user.firstName}
            </Link>
          ) : (
            <span className="text-orange-400">ゲスト</span>
          )}
        </p>
      </div>

      {!user && (
        <div className="my-6">
          <Link
            href="/sign-in"
            className="rounded bg-blue-500 p-3 text-white hover:bg-blue-400"
          >
            サインイン
          </Link>
        </div>
      )}

      <Chat />
      <div className="my-20">
        <Suspense fallback={<Loading />}>
          <a id="rooms" className="mx-2 text-gray-600">
            Languages
          </a>
          {/* @ts-expect-error Server Component */}
          <Languages />
        </Suspense>
      </div>
    </div>
  );
}
