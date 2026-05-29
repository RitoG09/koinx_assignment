import { formatGainDisplay } from "@/lib/formatters";

interface Props {
  value: number;
}

export default function GainBadge({ value }: Props) {
  const positive = value >= 0;

  return (
    <span
      className={`font-medium ${positive ? "text-gain-positive" : "text-gain-negative"}`}
    >
      {formatGainDisplay(value)}
    </span>
  );
}
