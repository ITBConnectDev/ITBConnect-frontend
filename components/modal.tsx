import { Dialog } from "@headlessui/react";
import classNames from "classnames";
import React from "react";

function Modal({
  isOpen,
  onClose,
  children,
  title,
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <Dialog onClose={onClose} open={isOpen} className="relative z-50">
      <Dialog.Overlay className="fixed inset-0 bg-black/20 flex items-center justify-center">
        <Dialog.Panel
          className={classNames(
            "bg-white px-10 py-8 rounded-[30px]",
            className
          )}
        >
          <Dialog.Title
            className={"text-2xl font-bold font-lexend text-green-primary mb-4"}
          >
            {title}
          </Dialog.Title>
          {children}
        </Dialog.Panel>
      </Dialog.Overlay>
    </Dialog>
  );
}

export default Modal;
