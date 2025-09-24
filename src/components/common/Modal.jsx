import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
function Modal({
  open,
  onClose,
  title,
  description,
  children,
  cancelLabel,
  onSubmit,
  submitLabel,
  disabled,
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (onSubmit) {
        await onSubmit();
      }
    } catch (err) {
      console.error("Error during submit:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black sm:max-w-lg rounded-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">{children}</div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose(false)}
            >
              {cancelLabel}
            </Button>
            <Button
              className={
                "cursor-pointer bg-gray-200 text-black ho hover:bg-gray-200"
              }
              type="submit"
              disabled={disabled || loading}
            >
              {loading ? "Submitting..." : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
