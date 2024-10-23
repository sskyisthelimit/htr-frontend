import * as React from "react";
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sidebar</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-lg font-bold">Sidebar</h1>
          <Input placeholder="Search..." />
          <Separator />
          <div className="flex items-center">
            <Tooltip>
              <TooltipTrigger>
                <Button>Tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Skeleton className="h-8 w-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
