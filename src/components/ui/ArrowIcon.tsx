interface ArrowIconProps {
  direction?: 'right' | 'left' | 'up' | 'down';
  className?: string;
}

export function ArrowIcon({ direction = 'right', className = "w-5 h-5" }: ArrowIconProps) {
  const paths = {
    right: "M13 7l5 5m0 0l-5 5m5-5H6",
    left: "M11 17l-5-5m0 0l5-5m-5 5h12", 
    up: "M7 13l5-5m0 0l5 5m-5-5v12",
    down: "M17 11l-5 5m0 0l-5-5m5 5V6"
  };

  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={paths[direction]} />
    </svg>
  );
}