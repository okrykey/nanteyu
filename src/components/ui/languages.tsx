import { prisma } from "@/lib/prismaClient";
import Link from "next/link";

export default async function Languages() {
  const languages = await prisma.language.findMany();
  if (!languages || languages.length === 0)
    return <div className="my-14">sorry...</div>;

  return (
    <div className="my-8 grid gap-4 md:grid-cols-3">
      {languages.map((language) => (
        <Link
          href={`/language/${language.id}`}
          className="flex h-full flex-col justify-between rounded-xl border p-2 text-left shadow hover:bg-gray-100"
          key={language.id}
        >
          <div className="flex">
            <p className="text-sm font-semibold text-purple-500 md:text-base">
              {language.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
