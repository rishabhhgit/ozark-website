export default function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "ghs-pill whitespace-nowrap rounded-lg border px-3 py-1.5 text-[12.5px] font-medium",
        active ? "border-accent bg-hover text-accent" : "border-border text-sub",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
