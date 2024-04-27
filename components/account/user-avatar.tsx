import { User } from "@clerk/nextjs/server";
import { AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "imageUrl" | "firstName" | "lastName">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Avatar {...props}>
      {user.imageUrl ? (
        <AvatarImage alt="Picture" src={user.imageUrl} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{fullName}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
