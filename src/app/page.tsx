import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./Loading";
import Chat from "./_components/Chat";
import Languages from "./_components/Languages";
import { getUser } from "./_lib/clerk";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="m-4">
      <div>
        <p className="mt-4 text-2xl font-semibold">
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
          さん
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
      {user && user.imageUrl && (
        <Image
          src={user.imageUrl}
          width={45}
          height={45}
          alt="プロフィール画像"
          className="my-4 rounded-full"
        />
      )}
      <Chat></Chat>
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
