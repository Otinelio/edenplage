type Props = { color?: string; flip?: boolean; className?: string };

export function WaveDivider({ color = "#F8FAF9", flip, className }: Props) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`block w-full h-[60px] md:h-[80px] ${flip ? "rotate-180" : ""} ${className ?? ""}`}
      aria-hidden
    >
      <path
        d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
        fill={color}
      />
    </svg>
  );
}
