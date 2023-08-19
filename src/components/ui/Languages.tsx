import { prisma } from "@/lib/prismaClient";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Languages() {
  const languages = await prisma.language.findMany();
  if (!languages || languages.length === 0)
    return <div className="my-14">sorry...</div>;

  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      {languages.map((language) => (
        <Link
          href={`/language/${language.id}`}
          className="flex h-full flex-col justify-between shadow hover:bg-gray-100"
          key={language.id}
        >
          <Card className="flex">
            <CardHeader>
              <CardTitle>{language.name}</CardTitle>
              <CardDescription>Description</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
