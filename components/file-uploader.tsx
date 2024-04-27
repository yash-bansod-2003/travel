import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Icons } from "./icons";

type FileUploadProps = React.HTMLAttributes<HTMLDivElement> & {
  endpoint: keyof typeof ourFileRouter;
  value: string;
  onChange: (...event: any[]) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({
  endpoint,
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <>
      {value ? (
        <div className="relative overflow-hidden rounded-md border h-80 w-80">
          <Image
            src={value}
            alt="billboard display image"
            fill
            className="object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute right-1 top-1"
            onClick={() => onChange(null)}
          >
            <Icons.close />
          </Button>
        </div>
      ) : (
        <UploadDropzone
          className={cn(
            "w-fit border-foreground ut-upload-icon:text-foreground/60 ut-label:text-foreground ut-button:bg-foreground ut-button:text-background",
            className,
          )}
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
          }}
          onUploadError={(err) => {
            return toast.error("Something went wrong", {
              description: "there is an error while uploading file",
            });
          }}
        />
      )}
    </>
  );
};

export { FileUpload };
