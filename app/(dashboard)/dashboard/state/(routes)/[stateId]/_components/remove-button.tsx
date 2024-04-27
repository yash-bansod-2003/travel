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

type StateDeleteButtonProps = ButtonProps & {
  stateId: string;
};

export const StateDeleteButton: React.FC<StateDeleteButtonProps> = ({
  stateId,
  className,
  children,
  ...props
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function handleRemove(stateId: string) {
    setIsLoading(true);

    const response = await fetch(`/api/state/${stateId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast.error("Something went wrong..", {
        description: "Your state not deleted, please try again",
      });
    }

    router.refresh();

    return toast.success("state deleted Successfully.", {
      description:
        "Your state was removed, refer dashboard for furthur updates",
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
            onClick={() => handleRemove(stateId)}
            disabled={isLoading}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
