import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ampm, fmt, useNav } from "../nav";
import {
  A, ButtonPrimary, ButtonSecondary, Check, HomeIndicator, IconButton, Img, Screen, Spinner, StatusBar, TopGlows, ease, rise, softSpring, spring,
} from "../components/ui";

const H1 = ({ lines, i = 0, size = 34 }: { lines: string[]; i?: number; size?: number }) => (
  <motion.div {...rise(i)} className="relative shrink-0 text-white w-full" style={{ fontSize: size, letterSpacing: -size * 0.025 }}>
    {lines.map((l, k) => (
      <p key={k} className="leading-[1.1]">{l}</p>
    ))}
  </motion.div>
);

const Lead = ({ children, i = 0 }: { children: React.ReactNode; i?: number }) => (
  <motion.p {...rise(i)} className="leading-[1.4] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] w-full">
    {children}
  </motion.p>
);

const PageDots = ({ active }: { active: 0 | 1 }) => (
  <div className="flex gap-[6px] items-center relative shrink-0">
    {[0, 1].map((k) => (
      <motion.div
        key={k}
        layout
        transition={spring}
        className="h-[6px] rounded-[3px]"
        style={{ width: k === active ? 18 : 6, background: k === active ? "#fff" : "rgba(255,255,255,0.3)" }}
      />
    ))}
  </div>
);

/* ------------------------------ 01 Invite ------------------------------ */

export function S01() {
  const { go } = useNav();
  const [declined, setDeclined] = useState(false);
  return (
    <Screen>
      <TopGlows id="s01" />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px overflow-clip pt-[12px] px-[24px] relative w-full font-text">
        <motion.div {...rise(0)} className="flex gap-[12px] items-center relative shrink-0 w-full">
          <motion.div
            className="grad-x flex items-center justify-center overflow-clip relative rounded-[22px] shrink-0 size-[44px]"
            initial={{ scale: 0.6, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ ...softSpring, delay: 0.15 }}
          >
            <p className="leading-[normal] text-[18px] text-white">Q</p>
          </motion.div>
          <div className="flex flex-col gap-[2px] items-start leading-[normal] whitespace-nowrap">
            <p className="text-[15px] text-white">Questura di Milano</p>
            <p className="text-[13px] text-[rgba(255,255,255,0.5)]">Workplace | 3 Rest Pods</p>
          </div>
        </motion.div>
        <div className="h-[330px] overflow-clip relative rounded-[28px] shrink-0 w-full">
          <motion.div
            className="absolute h-[289px] left-0 top-0 w-[345px]"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{ opacity: { duration: 0.8 }, scale: { duration: 0.9, ease }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.9 } }}
          >
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A("s01-pod.png")} />
          </motion.div>
        </div>
        <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <H1 i={2} lines={["You’re invited", "to Rest Pod"]} />
          <Lead i={3}>
            Questura di Milano added you to its Rest Pod network. Book a 30-minute nap at work whenever the afternoon dip hits.
          </Lead>
        </div>
      </div>
      <motion.div {...rise(4)} className="flex flex-col gap-[12px] items-center overflow-clip pt-[16px] px-[24px] relative shrink-0 w-full">
        <p className="font-text leading-[normal] text-[12px] text-[rgba(255,255,255,0.4)] text-center w-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={String(declined)} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="inline-block">
              {declined ? "No problem — the invite stays in Account settings" : "Invited by Giulia Rossi, Workplace admin"}
            </motion.span>
          </AnimatePresence>
        </p>
        <ButtonPrimary label="Accept invite" onClick={() => go("02")} />
        <ButtonSecondary label="Not now" onClick={() => setDeclined(true)} />
      </motion.div>
      <HomeIndicator />
    </Screen>
  );
}

/* ------------------------------ 02 Rest at work ------------------------------ */

export function S02() {
  const { go } = useNav();
  return (
    <Screen>
      <TopGlows id="s02" />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px overflow-clip pt-[12px] px-[24px] relative w-full font-text">
        <div className="flex items-center justify-between min-h-[32px] relative shrink-0 w-full">
          <PageDots active={0} />
          <button onClick={() => go("04")} className="leading-[normal] text-[15px] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors">
            Skip
          </button>
        </div>
        <div className="h-[342px] relative shrink-0 w-full">
          <motion.div
            className="absolute bottom-0 h-[330px] left-0 overflow-clip rounded-[28px] w-[345px]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease }}
          >
            <motion.img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={A("s02-pod.png")}
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease }}
            />
          </motion.div>
        </div>
        <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <H1 i={2} lines={["Rest, built into", "your workday"]} />
          <Lead i={3}>One 30-minute session: time to settle in, a short nap, and a gentle wake-up before deep sleep kicks in.</Lead>
        </div>
      </div>
      <motion.div {...rise(4)} className="flex flex-col items-center overflow-clip pt-[16px] px-[24px] relative shrink-0 w-full">
        <ButtonPrimary label="Continue" onClick={() => go("03")} />
      </motion.div>
      <HomeIndicator />
    </Screen>
  );
}

/* ------------------------------ 03 Timing ------------------------------ */

export function S03() {
  const { go } = useNav();
  return (
    <Screen>
      <TopGlows id="s03" />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px overflow-clip pt-[12px] px-[24px] relative w-full font-text">
        <div className="flex items-center justify-between min-h-[32px] relative shrink-0 w-full">
          <PageDots active={1} />
          <button onClick={() => go("04")} className="leading-[normal] text-[15px] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors">
            Skip
          </button>
        </div>
        <motion.div
          {...rise(0)}
          className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex flex-col gap-[18px] items-start overflow-clip p-[20px] relative rounded-[24px] shrink-0 w-full"
        >
          <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.5)] tracking-[1.32px] w-full">YOUR DAY</p>
          <div className="bg-[rgba(255,255,255,0.1)] h-[8px] relative rounded-[4px] shrink-0 w-full">
            <motion.div
              className="absolute grad-x h-[8px] left-[37.75%] right-[43.38%] rounded-[4px] top-0 origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.45 }}
            />
            <motion.div
              className="absolute left-[37.75%] right-[43.38%] top-[-4px] h-[16px] rounded-full grad-x blur-[10px]"
              animate={{ opacity: [0.2, 0.55, 0.2] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
            />
          </div>
          <div className="flex font-num font-normal items-center justify-between leading-[normal] relative shrink-0 text-[13px] tracking-[0.26px] w-full whitespace-nowrap">
            <p className="text-[rgba(255,255,255,0.5)]">Wake 7a</p>
            <p className="text-white">Nap 1–4p</p>
            <p className="text-[rgba(255,255,255,0.5)]">Bed 11p</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.08)] h-px relative shrink-0 w-full" />
          <div className="flex gap-[12px] items-start relative shrink-0 w-full">
            <div className="flex gap-[4px] items-end relative shrink-0 whitespace-nowrap">
              <p className="font-num font-light leading-none text-[44px] text-white">10–20</p>
              <p className="font-num font-normal leading-[normal] text-[14px] text-[rgba(255,255,255,0.6)]">MIN</p>
            </div>
            <p className="flex-[1_0_0] leading-[1.4] min-w-px text-[14px] text-[rgba(255,255,255,0.6)]">
              of real sleep is the sweet spot. Longer naps leave you groggy.
            </p>
          </div>
        </motion.div>
        <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <H1 i={2} lines={["Timing is", "everything"]} />
          <Lead i={3}>We’ll suggest the best moment for you: about 6 hours after you wake up, and never too close to bedtime.</Lead>
        </div>
      </div>
      <div className="flex flex-col gap-[16px] items-center overflow-clip pt-[16px] px-[24px] relative shrink-0 w-full font-text">
        <motion.div
          {...rise(4)}
          className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex gap-[14px] items-center overflow-clip px-[20px] py-[16px] relative rounded-[24px] shrink-0 w-full"
        >
          <div className="bg-white flex items-center justify-center rounded-[12px] shrink-0 size-[40px]">
            <p className="font-num font-normal leading-[normal] text-[22px] text-black">8</p>
          </div>
          <div className="flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px">
            <p className="leading-[normal] text-[14px] text-white w-full">Have a Pod at home?</p>
            <p className="leading-[1.35] text-[13px] text-[rgba(255,255,255,0.55)] w-full">
              Your nights sync automatically, so work naps and sleep at home become one routine.
            </p>
          </div>
        </motion.div>
        <motion.div {...rise(5)} className="w-full">
          <ButtonPrimary label="Continue" onClick={() => go("04")} />
        </motion.div>
      </div>
      <HomeIndicator />
    </Screen>
  );
}

/* ------------------------------ 04 Wake time ------------------------------ */

const TIMES = Array.from({ length: 17 }, (_, k) => 5 * 60 + k * 15); // 5:00 … 9:00

function TimePicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const idx = Math.max(0, TIMES.indexOf(value));
  const ref = useRef<HTMLDivElement>(null);
  const lock = useRef(0);
  const drag = useRef<{ y: number; idx: number } | null>(null);

  const setIdx = (n: number) => onChange(TIMES[Math.max(0, Math.min(TIMES.length - 1, n))]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lock.current < 110 || Math.abs(e.deltaY) < 4) return;
      lock.current = now;
      setIdx(idx + (e.deltaY > 0 ? 1 : -1));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  return (
    <div
      ref={ref}
      className="relative shrink-0 w-full h-[276px] overflow-hidden pt-0 cursor-grab active:cursor-grabbing select-none touch-none"
      onPointerDown={(e) => {
        drag.current = { y: e.clientY, idx };
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        const d = Math.round((drag.current.y - e.clientY) / 40);
        const n = Math.max(0, Math.min(TIMES.length - 1, drag.current.idx + d));
        if (TIMES[n] !== value) setIdx(n);
      }}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
    >
      <div className="absolute left-0 right-0 top-[96px] h-[84px] bg-[rgba(255,255,255,0.06)] rounded-[24px]" />
      <motion.div className="absolute left-0 right-0 top-0 flex flex-col items-center" animate={{ y: 96 - idx * 48 }} transition={spring}>
        {TIMES.map((t, k) => {
          const d = Math.abs(k - idx);
          return (
            <button
              key={t}
              onClick={() => setIdx(k)}
              className="flex items-center justify-center overflow-visible relative shrink-0 w-full"
              style={{
                height: d === 0 ? 84 : 48,
                opacity: d === 0 ? 1 : d === 1 ? 0.35 : d === 2 ? 0.15 : 0,
                transition: "height .35s cubic-bezier(.22,1,.36,1), opacity .35s",
              }}
            >
              <p
                className="font-num font-light leading-[normal] text-white whitespace-nowrap"
                style={{ fontSize: d === 0 ? 56 : 30, transition: "font-size .35s cubic-bezier(.22,1,.36,1)" }}
              >
                {fmt(t)}
                {d === 0 && ` ${ampm(t)}`}
              </p>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}

export function S04() {
  const { go, back, state, set } = useNav();
  const start = state.wake + 6 * 60;
  const windowLabel = `${fmt(start)} – ${fmt(start + 180)} ${ampm(start + 180)}`;
  return (
    <Screen>
      <TopGlows id="s04" />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px overflow-clip pt-[12px] px-[24px] relative w-full font-text">
        <div className="flex items-center justify-between min-h-[32px] relative shrink-0 w-full">
          <IconButton src={A("back.svg")} onClick={back} />
          <p className="leading-[normal] text-[13px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">1 of 2</p>
        </div>
        <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <motion.p {...rise(0)} className="leading-[1.1] text-[30px] text-white tracking-[-0.75px] w-full">
            When do you usually wake up on workdays?
          </motion.p>
          <Lead i={1}>It helps us find your ideal nap time.</Lead>
        </div>
        <motion.div {...rise(2)} className="flex flex-col items-center pt-[8px] relative shrink-0 w-full">
          <TimePicker value={state.wake} onChange={(wake) => set({ wake })} />
        </motion.div>
        <motion.div
          {...rise(3)}
          className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex gap-[6px] items-center justify-center overflow-clip px-[18px] py-[14px] relative rounded-[20px] shrink-0 w-full"
        >
          <motion.div key={state.wake} initial={{ rotate: -90, scale: 0.4 }} animate={{ rotate: 0, scale: 1 }} transition={softSpring}>
            <Img src="sparkle.svg" size={18} />
          </motion.div>
          <p className="leading-[normal] text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Your nap window: </p>
          <div className="relative overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={windowLabel}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.25, ease }}
                className="leading-[normal] text-[14px] text-white whitespace-nowrap"
              >
                {windowLabel}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <motion.div {...rise(4)} className="flex flex-col items-center overflow-clip pt-[16px] px-[24px] relative shrink-0 w-full">
        <ButtonPrimary label="Continue" onClick={() => go("05")} />
      </motion.div>
      <HomeIndicator />
    </Screen>
  );
}

/* ------------------------------ 05 Calendar ------------------------------ */

export function S05() {
  const { go, back } = useNav();
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const connect = () => {
    if (phase !== "idle") return;
    setPhase("loading");
    setTimeout(() => setPhase("done"), 1100);
    setTimeout(() => go("06", "rise"), 1700);
  };
  const Slot = ({ time, children, i }: { time: string; children: React.ReactNode; i: number }) => (
    <motion.div {...rise(i, 8)} className="flex gap-[14px] items-center relative shrink-0 w-full">
      <p className="font-num font-normal leading-[normal] text-[14px] text-[rgba(255,255,255,0.45)] w-[30px] shrink-0">{time}</p>
      {children}
    </motion.div>
  );
  return (
    <Screen>
      <TopGlows id="s05" />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px overflow-clip pt-[12px] px-[24px] relative w-full font-text">
        <div className="flex items-center justify-between min-h-[32px] relative shrink-0 w-full">
          <IconButton src={A("back.svg")} onClick={back} />
          <p className="leading-[normal] text-[13px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">2 of 2</p>
        </div>
        <motion.div
          {...rise(0)}
          className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex flex-col gap-[8px] items-start overflow-clip p-[20px] relative rounded-[24px] shrink-0 w-full"
        >
          <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.5)] tracking-[1.32px] w-full">TODAY</p>
          <Slot time="12:00" i={1}>
            <div className="bg-[rgba(255,255,255,0.06)] flex flex-[1_0_0] items-center min-h-[44px] min-w-px px-[14px] rounded-[14px]">
              <p className="leading-[normal] text-[14px] text-[rgba(255,255,255,0.4)]">Busy</p>
            </div>
          </Slot>
          <Slot time="1:10" i={2}>
            <motion.div
              className="grad-x flex flex-[1_0_0] gap-[8px] items-center min-h-[56px] min-w-px overflow-clip px-[14px] relative rounded-[14px]"
              initial={{ scaleX: 0.6, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              style={{ originX: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
            >
              <motion.div
                className="absolute inset-y-0 w-[60px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.35)] to-transparent"
                initial={{ x: -80 }}
                animate={{ x: 320 }}
                transition={{ duration: 1.4, delay: 1.3, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }}
              />
              <motion.div animate={{ rotate: [0, 90, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2.2, repeat: Infinity, delay: 1.2 }}>
                <Img src="sparkle-16.svg" size={16} />
              </motion.div>
              <p className="leading-[normal] text-[14px] text-white whitespace-nowrap relative">Suggested nap, 30 min</p>
            </motion.div>
          </Slot>
          <Slot time="2:00" i={3}>
            <div className="bg-[rgba(255,255,255,0.06)] flex flex-[1_0_0] items-center min-h-[44px] min-w-px px-[14px] rounded-[14px]">
              <p className="leading-[normal] text-[14px] text-[rgba(255,255,255,0.4)]">Busy</p>
            </div>
          </Slot>
        </motion.div>
        <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <H1 i={3} lines={["Find time to rest,", "automatically"]} />
          <Lead i={4}>Connect your work calendar and we’ll suggest nap slots that fit between your meetings.</Lead>
        </div>
      </div>
      <motion.div {...rise(5)} className="flex flex-col gap-[14px] items-center overflow-clip pt-[16px] px-[24px] relative shrink-0 w-full font-text">
        <div className="flex gap-[10px] items-center relative shrink-0 w-full">
          <Img src="lock.svg" size={18} />
          <p className="flex-[1_0_0] leading-[1.22] min-w-px text-[13px] text-[rgba(255,255,255,0.55)]">
            We only see when you’re busy, never what your meetings are about.
          </p>
        </div>
        <ButtonPrimary
          onClick={connect}
          label={
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={phase} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
                {phase === "idle" && "Connect calendar"}
                {phase === "loading" && (<><Spinner /> Connecting…</>)}
                {phase === "done" && (<><Check /> Connected</>)}
              </motion.span>
            </AnimatePresence>
          }
        />
        <ButtonSecondary label="Maybe later" onClick={() => go("06", "rise")} />
      </motion.div>
      <HomeIndicator />
    </Screen>
  );
}
