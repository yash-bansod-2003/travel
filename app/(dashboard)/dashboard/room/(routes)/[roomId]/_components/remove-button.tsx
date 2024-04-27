"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type RoomDeleteButtonProps = ButtonProps & {
  roomId: string;
};

export const RoomDeleteButton: React.FC<RoomDeleteButtonProps> = ({
  roomId,
  className,
  children,
  ...props
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function handleRemove(roomId: string) {
    setIsLoading(true);

    const response = await fetch(`/api/room/${roomId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast.error("Something went wrong..", {
        description: "Your room not deleted, please try again",
      });
    }

    router.refresh();

    return toast.success("room deleted Successfully.", {
      description: "Your room was removed, refer dashboard for furthur updates",
    });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn("items-start", className)}
          disabled={isLoading}
          {...props}
        >
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            billboard and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleRemove(roomId)}
            disabled={isLoading}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
