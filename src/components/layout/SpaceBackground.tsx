/**
 * Fixed full-viewport starfield: space photo base, twinkling star tile,
 * and a periodic shooting star. Sits behind all content (-z-10).
 */
export function SpaceBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-[url('/space-bg.jpg')] bg-cover bg-center"
    >
      <div className="absolute inset-0 size-[200%] animate-twinkle bg-[url('/2.png')] bg-repeat opacity-40" />
      <div
        className="absolute top-[20%] left-[110%] h-20 w-0.5 animate-shoot rounded-full bg-gradient-to-b from-white to-transparent opacity-0"
        style={{ boxShadow: "0 0 6px 2px white" }}
      />
      {/* Subtle vignette so foreground text stays readable */}
      <div className="absolute inset-0 bg-space-950/40" />
    </div>
  );
}
