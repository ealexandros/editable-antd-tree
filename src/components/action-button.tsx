import { cn } from "@/utilities/cn";
import { Tooltip } from "antd";

type ActionButtonProps = {
  disabled?: boolean;
  label: string;
  onClick: (e: React.MouseEvent) => void;
  icon: React.ReactNode;
  className?: string;
};

export const ActionButton = ({
  disabled,
  label,
  onClick,
  icon,
  className,
}: ActionButtonProps) => (
  <Tooltip title={label}>
    <button
      className={cn(
        "cursor-pointer text-neutral-400 transition-all hover:text-neutral-900",
        className,
      )}
      disabled={disabled}
      onClick={onClick}>
      {icon}
    </button>
  </Tooltip>
);
