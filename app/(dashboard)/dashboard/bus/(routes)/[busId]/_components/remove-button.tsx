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

type BusDeleteButtonProps = ButtonProps & {
  busId: string;
};

export const BusDeleteButton: React.FC<BusDeleteButtonProps> = ({
  busId,
  className,
  children,
  ...props
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function handleRemove(busId: string) {
    setIsLoading(true);

    const response = await fetch(`/api/bus/${busId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast.error("Something went wrong..", {
        description: "Your bus not deleted, please try again",
      });
    }

    router.refresh();

    return toast.success("bus deleted Successfully.", {
      description: "Your bus was removed, refer dashboard for furthur updates",
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
            onClick={() => handleRemove(busId)}
            disabled={isLoading}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
