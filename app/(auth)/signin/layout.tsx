import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type AuthSignInLayoutProps = React.PropsWithChildren;

export default async function AuthSignInLayout({
  children,
}: AuthSignInLayoutProps) {
  const user = await currentUser();

  if (user) {
    return redirect("/");
  }

  return children;
}
