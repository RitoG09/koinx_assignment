interface GainRowProps {
  label: string;
  value: string;
}

export default function GainRow({ label, value }: GainRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
