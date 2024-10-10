import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip";

interface UnifiedTooltipProps {
  triggerItem: JSX.Element;
  tooltipContent: JSX.Element;
}

const UnifiedTooltip = ({
  triggerItem,
  tooltipContent,
}: UnifiedTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{triggerItem}</TooltipTrigger>
        <TooltipContent className="bg-white relative">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UnifiedTooltip;
