import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function CardTooltipIcon({ actions = [], className, iconSize }) {
  return (
    <div className={className}>
      {actions.map(
        ({ onClick, color, icon: Icon, tooltipContent, btnClass }, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <button onClick={onClick} className={btnClass}>
                {Icon && <Icon size={iconSize} className={color} />}
              </button>
            </TooltipTrigger>
            <TooltipContent>{tooltipContent}</TooltipContent>
          </Tooltip>
        )
      )}
    </div>
  );
}

export default CardTooltipIcon;
