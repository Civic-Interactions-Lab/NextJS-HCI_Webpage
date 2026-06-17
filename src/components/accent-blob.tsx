interface AccentBlobProps {
  className?: string;
}

// A soft organic shape used as a decorative accent behind photos/cards —
// the one "playful" visual motif reused across the home page sections so
// the friendliness reads as a deliberate design choice, not noise.
export function AccentBlob({ className = "" }: AccentBlobProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M45.7,-58.5C59.5,-50.9,70.7,-36.6,75.7,-20.1C80.7,-3.6,79.5,15.1,71.7,30.4C63.9,45.7,49.5,57.6,33.4,64.8C17.3,72,-0.5,74.5,-17.8,71C-35.1,67.5,-51.9,58,-62.5,43.8C-73.1,29.6,-77.5,10.7,-75.3,-7.3C-73.1,-25.3,-64.3,-42.4,-50.7,-50.4C-37.1,-58.4,-18.6,-57.3,-1.1,-55.7C16.4,-54,32.8,-51.9,45.7,-58.5Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
