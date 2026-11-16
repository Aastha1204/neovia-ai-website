import HeroFX from "./HeroFX";
import SplitText from "./SplitText";

/** Dark banner with the shader background, used at the top of the Demos, Pricing and Book-a-meeting pages. */
export default function PageHero({ eyebrow, title, text, children }: { eyebrow: string; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-mist px-4 pb-16 pt-14 text-ink sm:pb-20 sm:pt-20">
      <HeroFX particles={false} intensity={0.9} />
      <div className="wrap relative">
        <p className="eyebrow rise">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl"><SplitText text={title} /></h1>
        {text && <p className="rise rise-2 mt-4 max-w-2xl text-lg text-ink/80">{text}</p>}
        {children && <div className="rise rise-3 mt-6">{children}</div>}
      </div>
    </section>
  );
}
