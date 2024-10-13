import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";
import { Dispatch, SetStateAction } from "react";

import { Button } from "../Button";

interface UnifiedDialogProps {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  triggerItem: JSX.Element;
  dialogTitle: string;
  dialogDescription: string;
  dialogContent: JSX.Element;
}

const UnifiedDialog = ({
  open,
  setOpen,
  triggerItem,
  dialogTitle,
  dialogDescription,
  dialogContent,
}: UnifiedDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{triggerItem}</DialogTrigger>
      <DialogPortal>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <DialogContent>{dialogContent}</DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default UnifiedDialog;
