import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

export function Dropzone({ onDrop, accept, className, children, ...props }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    ...props,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center transition hover:border-gray-400",
        isDragActive && "border-gray-500 bg-gray-100",
        className
      )}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
}

export function DropzoneEmptyState({
  label = "Drag & drop files here or click to upload",
}) {
  return <p className="text-sm text-gray-500">{label}</p>;
}

export function DropzoneContent({ children }) {
  return <div className="mt-2 w-full">{children}</div>;
}
