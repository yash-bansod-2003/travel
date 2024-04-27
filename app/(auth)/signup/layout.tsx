import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type AuthSignUpLayoutProps = React.PropsWithChildren;

export default async function AuthSignUpLayout({
  children,
}: AuthSignUpLayoutProps) {
  const user = await currentUser();

  if (user) {
    return redirect("/");
  }

  return children;
}
