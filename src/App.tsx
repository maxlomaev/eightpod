import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useLayoutEffect, useState, type ComponentType } from "react";
import { SCREENS, useNav, type ScreenId, type Transition } from "./nav";
import { S01, S02, S03, S04, S05 } from "./screens/Onboarding";
import { S06, S07, S08, S20 } from "./screens/Home";
import { S09, S10, S11 } from "./screens/Booking";
import { S12, S13, S14, S15, S16, S17, S18, S19 } from "./screens/Session";

const MAP: Record<ScreenId, ComponentType> = {
  "01": S01, "02": S02, "03": S03, "04": S04, "05": S05, "06": S06, "07": S07, "08": S08, "09": S09, "10": S10,
  "11": S11, "12": S12, "13": S13, "14": S14, "15": S15, "16": S16, "17": S17, "18": S18, "19": S19, "20": S20,
};

const W = 393;
const H = 852;
const BEZEL = 12;

const variants: Variants = {
  initial: (t: Transition) =>
    t === "push" ? { x: W, opacity: 1, scale: 1 }
    : t === "pop" ? { x: -W * 0.3, opacity: 0.6, scale: 1 }
    : t === "rise" ? { y: 60, opacity: 0, scale: 0.98 }
    : { opacity: 0, scale: 1.03 },
  animate: { x: 0, y: 0, opacity: 1, scale: 1 },
  exit: (t: Transition) =>
    t === "push" ? { x: -W * 0.3, opacity: 0.5 }
    : t === "pop" ? { x: W, opacity: 1, zIndex: 2 }
    : t === "rise" ? { opacity: 0, scale: 0.96 }
    : { opacity: 0, scale: 0.98 },
};

function useScale() {
  const calc = () => Math.min(1, (window.innerHeight - 40) / (H + BEZEL * 2), (window.innerWidth - 24) / (W + BEZEL * 2));
  const [s, setS] = useState(calc);
  useLayoutEffect(() => {
    const on = () => setS(calc());
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return s;
}

function Phone() {
  const { screen, transition } = useNav();
  const Cmp = MAP[screen];
  const scale = useScale();
  return (
    <div style={{ width: (W + BEZEL * 2) * scale, height: (H + BEZEL * 2) * scale }} className="shrink-0">
      <div
        className="relative rounded-[56px] bg-[#1b1b22] shadow-[0_40px_120px_rgba(0,0,0,0.6),inset_0_0_0_1.5px_rgba(255,255,255,0.09)] origin-top-left"
        style={{ width: W + BEZEL * 2, height: H + BEZEL * 2, padding: BEZEL, transform: `scale(${scale})` }}
      >
        <div className="relative overflow-hidden rounded-[44px] bg-[#060609]" style={{ width: W, height: H }}>
          <AnimatePresence initial={false} custom={transition} mode="popLayout">
            <motion.div
              key={screen}
              custom={transition}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 34, mass: 0.9 }}
              className="absolute inset-0 shadow-[-20px_0_40px_rgba(0,0,0,0.35)] rounded-[44px]"
            >
              <Cmp />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Panel() {
  const { screen, jump } = useNav();
  const current = SCREENS.find((s) => s.id === screen)!;
  return (
    <aside className="hidden lg:flex flex-col w-[300px] shrink-0 h-[min(852px,calc(100vh-40px))] font-text">
      <p className="text-[11px] tracking-[1.32px] text-[rgba(255,255,255,0.45)] mb-3">8TH SLEEP · REST POD</p>
      <div className="no-scrollbar flex-1 min-h-0 overflow-y-auto pr-2 -mr-2">
        {SCREENS.map((s) => {
          const on = s.id === screen;
          return (
            <button
              key={s.id}
              onClick={() => jump(s.id)}
              className="relative flex w-full items-center gap-3 rounded-[12px] px-3 py-[7px] text-left text-[13px] transition-colors hover:bg-[rgba(255,255,255,0.04)]"
            >
              {on && <motion.span layoutId="panel-sel" className="absolute inset-0 rounded-[12px] bg-[rgba(255,255,255,0.08)]" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative font-num text-[12px] w-5 text-[rgba(255,255,255,0.4)]">{s.id}</span>
              <span className="relative" style={{ color: on ? "#fff" : "rgba(255,255,255,0.6)" }}>{s.title}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4 min-h-[132px]">
        <AnimatePresence mode="wait">
          <motion.div key={current.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            <p className="text-[14px] text-white mb-1">{current.id} {current.title}</p>
            <p className="text-[12.5px] leading-[1.45] text-[rgba(255,255,255,0.55)]">{current.caption}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-3 text-[11px] text-[rgba(255,255,255,0.35)]">← → to step through screens · R to restart</p>
    </aside>
  );
}

export default function App() {
  const { screen, jump } = useNav();
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      const i = SCREENS.findIndex((s) => s.id === screen);
      if (e.key === "ArrowRight" && i < SCREENS.length - 1) jump(SCREENS[i + 1].id);
      if (e.key === "ArrowLeft" && i > 0) jump(SCREENS[i - 1].id);
      if (e.key.toLowerCase() === "r") jump("01");
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [screen, jump]);

  return (
    <div className="h-full w-full flex items-center justify-center gap-16 px-3 bg-[radial-gradient(ellipse_at_50%_0%,#1a1a2a_0%,#0d0d12_60%)]">
      <Panel />
      <Phone />
    </div>
  );
}
