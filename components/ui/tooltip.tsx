import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

export const Tooltip = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export const TooltipTrigger = ({ children }: { children: React.ReactNode }) => {
  return <Slot>{children}</Slot>;
};

export const TooltipContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-2 bg-gray-800 text-white rounded-md">
      {children}
    </div>
  );
};
