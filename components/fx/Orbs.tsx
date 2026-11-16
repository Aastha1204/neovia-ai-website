/** Soft, slowly drifting colour orbs behind a light section. The parent must be `position: relative; overflow: hidden`. */
export default function Orbs({ variant = "a" }: { variant?: "a" | "b" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {variant === "a" ? (
        <>
          <span suppressHydrationWarning className="orb orb-teal" style={{ top: "-10%", left: "-6%", width: "34rem", height: "34rem" }} data-parallax="-0.08" />
          <span suppressHydrationWarning className="orb orb-saffron" style={{ bottom: "-16%", right: "-8%", width: "30rem", height: "30rem" }} data-parallax="0.1" />
        </>
      ) : (
        <>
          <span suppressHydrationWarning className="orb orb-saffron" style={{ top: "-12%", right: "-4%", width: "28rem", height: "28rem" }} data-parallax="-0.06" />
          <span suppressHydrationWarning className="orb orb-indigo" style={{ bottom: "-18%", left: "-10%", width: "36rem", height: "36rem" }} data-parallax="0.08" />
        </>
      )}
    </div>
  );
}
