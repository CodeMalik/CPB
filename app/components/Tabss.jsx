import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
const Tabss = () => {
  return (
    <div className="container">
      <Tabs defaultValue="account">
        <TabsList className={"flex gap-4 justify-center items-center"}>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="pass1">Password</TabsTrigger>
          <TabsTrigger value="pass2">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
        <TabsContent value="pass1">Change your password 1 here.</TabsContent>
        <TabsContent value="pass2">Change your password 2 here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Tabss;
