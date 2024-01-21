import { prisma } from "@/lib/prismaClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendList from "./trendList";

const Trends = async () => {
  const languages = await prisma.language.findMany();
  if (!languages || languages.length === 0)
    return <div className="my-14">sorry...</div>;

  return (
    <>
      <Tabs defaultValue="english" className="w-full py-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="english">英語</TabsTrigger>
          <TabsTrigger value="spanish">スペイン語</TabsTrigger>
          <TabsTrigger value="chinese">中国語</TabsTrigger>
        </TabsList>
        <TabsContent value="english">
          <TrendList />
        </TabsContent>
        <TabsContent value="spanish">Change your password here.</TabsContent>
        <TabsContent value="chinese">Change</TabsContent>
      </Tabs>
    </>
  );
};

export default Trends;
