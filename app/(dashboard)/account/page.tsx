import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AccountForm from "./components/account-form";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: employees } = await supabase
    .from("employees")
    .select("*")
    .order("name", { ascending: false });

  return (
    <>
      <h1>Account</h1>
      <AccountForm user={user} />
    </>
  );
}
