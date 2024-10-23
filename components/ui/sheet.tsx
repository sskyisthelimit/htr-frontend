import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

export const Sheet = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export const SheetTrigger = ({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) => {
  return asChild ? <Slot>{children}</Slot> : <button>{children}</button>;
};

export const SheetContent = ({ side, children }: { side?: string; children: React.ReactNode }) => {
  return (
    <div className={`fixed top-0 ${side === "left" ? "left-0" : "right-0"} h-full w-64 bg-white shadow-lg`}>
      {children}
    </div>
  );
};
