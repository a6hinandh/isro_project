import { motion } from "framer-motion";

/**
 * Fixed full-viewport starfield: space photo base, and two independent
 * scrolling star layers moving upwards at different speeds (3D parallax).
 * Background positions are animated directly to ensure a mathematically
 * seamless repeat with no visible boundary seams or reset jumps.
 */
export function SpaceBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-[url('/space-bg.jpg')] bg-cover bg-center"
    >
      {/* Slower Background Star Layer (1024px tile) */}
      <motion.div
        animate={{ backgroundPositionY: ["0px", "-1024px"] }}
        transition={{
          ease: "linear",
          duration: 60,
          repeat: Infinity,
        }}
        className="absolute inset-0 bg-[url('/2.png')] bg-repeat opacity-30"
      />

      {/* Faster Foreground Star Layer (2048px tile) */}
      <motion.div
        animate={{ backgroundPositionY: ["0px", "-2048px"] }}
        transition={{
          ease: "linear",
          duration: 35,
          repeat: Infinity,
        }}
        className="absolute inset-0 bg-[url('/twinkling.png')] bg-repeat opacity-45"
      />

      {/* Subtle vignette so foreground text stays readable */}
      <div className="absolute inset-0 bg-space-950/40" />
    </div>
  );
}
