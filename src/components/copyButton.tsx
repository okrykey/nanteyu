"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import copy from "clipboard-copy";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CopyButton = ({ copyText }: { copyText: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copy(copyText).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    });
  };

  return (
    <div className="flex justify-end">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button disabled={isCopied} onClick={handleCopy}>
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs p-1">回答をコピーする</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CopyButton;
