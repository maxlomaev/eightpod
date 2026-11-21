import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { fmt, useNav } from "../nav";
import { SLOTS } from "./Booking";
import {
  A, ButtonPrimary, ButtonSecondary, Check, Glow, HomeIndicator, IconButton, Img, Pill, Screen, Segmented, StatusBar, StatusDot, Stepper, TopGlows, ease, rise, softSpring, spring,
} from "../components/ui";

/* ------------------------------ helpers ------------------------------ */

function CountUp({ to, from = 0, duration = 1.1, delay = 0.3, format = (v: number) => String(Math.round(v)) }: {
  to: number; from?: number; duration?: number; delay?: number; format?: (v: number) => string;
}) {
  const mv = useMotionValue(from);
  const text = useTransform(mv, format);
  useEffect(() => {
    const c = animate(mv, to, { duration, delay, ease });
    return () => c.stop();
  }, [to]);
  return <motion.span>{text}</motion.span>;
}

const lockBg = "bg-gradient-to-b from-[#141a47] via-[#2e1f52] via-[60%] to-[#73474d]";

function LockGlows() {
  return (
    <>
      <Glow src={A("s12-glow.svg")} box={{ left: -80, top: 500, width: 560, height: 420 }} inset="-33.33% -25%" />
      <Glow src={A("s12-glow1.svg")} box={{ left: -160, top: -120, width: 500, height: 400 }} inset="-35% -28%" delay={0.5} drift={-16} />
    </>
  );
}

function LockClock({ time }: { time: string }) {
  return (
    <div className="flex flex-col gap-[2px] items-center pt-[4px] relative shrink-0 w-full">
      <motion.div initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease }}>
        <Img src="lock-22.svg" size={22} />
      </motion.div>
      <motion.p {...rise(0, 8)} className="font-text leading-[normal] text-[18px] text-[rgba(255,255,255,0.85)] whitespace-nowrap">
        Saturday, November 21
      </motion.p>
      <motion.p
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
        className="font-inter font-semibold leading-[normal] text-[92px] text-[rgba(255,255,255,0.92)] tracking-[-2.76px] whitespace-nowrap"
      >
        {time}
      </motion.p>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="flex items-center justify-between pb-[8px] px-[46px] relative shrink-0 w-full">
      {[0, 1].map((k) => (
        <motion.button key={k} whileTap={{ scale: 1.15 }} transition={spring} className="relative shrink-0 size-[50px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={A("lockscreen-btn.svg")} />
        </motion.button>
      ))}
    </div>
  );
}

const AppIcon = ({ size, radius, text }: { size: number; radius: number; text: number }) => (
  <div
    className="bg-black border border-[rgba(255,255,255,0.15)] flex items-center justify-center overflow-clip relative shrink-0"
    style={{ width: size, height: size, borderRadius: radius }}
  >
    <p className="font-num font-normal leading-[normal] text-white whitespace-nowrap" style={{ fontSize: text }}>8</p>
  </div>
);

/* ------------------------------ 12 Pre-nap reminder ------------------------------ */

export function S12() {
  const { go } = useNav();
  return (
    <Screen className={lockBg}>
      <LockGlows />
      <StatusBar />
      <LockClock time="12:50" />
      <div className="flex flex-[1_0_0] flex-col items-start justify-end min-h-px pb-[24px] px-[12px] relative w-full font-text">
        <motion.button
          onClick={() => go("13")}
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.97 }}
          transition={{ ...softSpring, delay: 0.9 }}
          className="backdrop-blur-[15px] bg-[rgba(140,140,166,0.22)] flex gap-[12px] items-start overflow-clip p-[14px] relative rounded-[24px] shrink-0 w-full text-left"
        >
          <motion.div animate={{ rotate: [0, -8, 8, -5, 5, 0] }} transition={{ duration: 0.6, delay: 1.4, repeat: Infinity, repeatDelay: 4 }}>
            <AppIcon size={38} radius={9.12} text={20.9} />
          </motion.div>
          <div className="flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px">
            <div className="flex items-center justify-between leading-[normal] w-full whitespace-nowrap">
              <p className="text-[15px] text-white">Your nap starts in 10 min</p>
              <p className="text-[13px] text-[rgba(255,255,255,0.55)]">now</p>
            </div>
            <p className="leading-[1.35] text-[14px] text-[rgba(255,255,255,0.8)] w-full">
              Pod 2F-B is cooling down for you. 2nd floor, next to the library.
            </p>
          </div>
        </motion.button>
      </div>
      <QuickActions />
      <HomeIndicator />
    </Screen>
  );
}

/* ------------------------------ 13 Check-in ------------------------------ */

export function S13() {
  const { go, back } = useNav();
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setScanned(true), 3000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!scanned) return;
    const t = setTimeout(() => go("14", "fade"), 1100);
    return () => clearTimeout(t);
  }, [scanned]);
  return (
    <Screen>
      <TopGlows id="s13" single />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px overflow-clip pt-[8px] px-[24px] relative w-full font-text">
        <div className="flex gap-[12px] items-center min-h-[44px] relative shrink-0 w-full">
          <IconButton src={A("back.svg")} onClick={back} />
          <p className="flex-[1_0_0] leading-[normal] min-w-px text-[16px] text-white">Start your nap</p>
        </div>
        <motion.button
          {...rise(0)}
          onClick={() => setScanned(true)}
          className="bg-[rgba(255,255,255,0.04)] h-[432px] overflow-clip relative rounded-[32px] shrink-0 w-full cursor-pointer"
        >
          <motion.div
            className="absolute h-[469px] left-0 top-0 w-[352px]"
            animate={{ scale: [1.04, 1.07, 1.04], x: [0, -4, 0], y: [0, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A("s13-qr.png")} />
          </motion.div>
          <motion.div
            className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.5px)] size-[200px] top-1/2"
            animate={scanned ? { scale: 0.92 } : { scale: [1, 1.04, 1] }}
            transition={scanned ? spring : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={A("scan-frame.svg")} />
            {!scanned && (
              <motion.div
                className="absolute left-[14px] right-[14px] h-[2px] rounded-full bg-[#7399ff] shadow-[0_0_14px_4px_rgba(115,153,255,0.55)]"
                animate={{ top: ["12%", "88%", "12%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </motion.div>
          <AnimatePresence>
            {scanned && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-[rgba(6,6,9,0.45)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="size-[72px] rounded-full bg-[#59D98C] flex items-center justify-center shadow-[0_0_40px_rgba(89,217,140,0.6)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={softSpring}
                >
                  <Check color="#060609" size={34} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          <motion.div {...rise(1)} className="flex gap-[8px] items-center">
            <StatusDot />
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={String(scanned)}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="leading-[normal] text-[13px] text-[rgba(255,255,255,0.7)] whitespace-nowrap"
              >
                {scanned ? "Checked in. Loading your settings…" : "Pod 2F-B is pre-cooled and ready"}
              </motion.p>
            </AnimatePresence>
          </motion.div>
          <motion.div {...rise(2)} className="text-[30px] text-white tracking-[-0.75px] w-full">
            <p className="leading-[1.1]">Scan the code</p>
            <p className="leading-[1.1]">on the headrest</p>
          </motion.div>
          <motion.p {...rise(3)} className="leading-[1.4] text-[16px] text-[rgba(255,255,255,0.6)] w-full">
            Checking in starts your 30 minutes and loads your settings.
          </motion.p>
        </div>
      </div>
      <motion.div {...rise(4)} className="flex flex-col items-center overflow-clip pt-[16px] px-[24px] relative shrink-0 w-full">
        <ButtonSecondary label="Enter code instead" onClick={() => setScanned(true)} />
      </motion.div>
      <HomeIndicator />
    </Screen>
  );
}

/* ------------------------------ 14 Live Activity ------------------------------ */

export function S14() {
  const { go } = useNav();
  return (
    <Screen className={lockBg}>
      <LockGlows />
      <StatusBar />
      <LockClock time="1:12" />
      <div className="flex flex-[1_0_0] flex-col items-start justify-end min-h-px pb-[24px] px-[12px] relative w-full font-text">
        <motion.button
          onClick={() => go("15")}
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.97 }}
          transition={{ ...softSpring, delay: 0.5 }}
          className="backdrop-blur-[15px] bg-[rgba(140,140,166,0.22)] flex flex-col gap-[14px] items-start overflow-clip px-[18px] py-[16px] relative rounded-[24px] shrink-0 w-full text-left"
        >
          <div className="flex gap-[10px] items-center relative shrink-0 w-full">
            <AppIcon size={28} radius={6.72} text={15.4} />
            <p className="flex-[1_0_0] leading-[normal] min-w-px text-[14px] text-white">Napping in Pod 2F-B</p>
            <p className="leading-[normal] text-[12px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Smart wake on</p>
          </div>
          <div className="flex items-end justify-between relative shrink-0 w-full whitespace-nowrap">
            <div className="flex flex-col gap-[2px] items-start">
              <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.6)] tracking-[1.32px]">WAKE-UP BY</p>
              <p className="font-num font-light leading-[1.05] text-[36px] text-white">1:30 PM</p>
            </div>
            <p className="font-num font-normal leading-[normal] text-[16px] text-[rgba(255,255,255,0.7)]">18 min left</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.18)] h-[6px] overflow-clip relative rounded-[3px] shrink-0 w-full">
            <motion.div
              className="absolute grad-x h-[6px] left-0 rounded-[3px] top-0"
              initial={{ width: "0%" }}
              animate={{ width: "38.56%" }}
              transition={{ duration: 1.4, ease, delay: 1 }}
            />
            <motion.div
              className="absolute top-0 h-[6px] w-[40px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.6)] to-transparent"
              animate={{ left: ["-12%", "38%"] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2, delay: 2.4, ease: "easeInOut" }}
            />
          </div>
          <div className="flex items-center justify-between leading-[normal] text-[12px] w-full whitespace-nowrap">
            <p className="text-[rgba(255,255,255,0.5)]">Settle in</p>
            <p className="text-white">Nap</p>
            <p className="text-[rgba(255,255,255,0.5)]">Wake</p>
          </div>
        </motion.button>
      </div>
      <QuickActions />
      <HomeIndicator />
    </Screen>
  );
}

/* ------------------------------ 15 During nap ------------------------------ */

export function S15() {
  const { go, state, set } = useNav();
  const [left, setLeft] = useState(18);
  useEffect(() => {
    if (left <= 0) {
      const t = setTimeout(() => go("17", "fade"), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLeft((l) => l - 1), left === 18 ? 2600 : 1400);
    return () => clearTimeout(t);
  }, [left]);
  const napFill = 46 + (1 - left / 18) * 54;
  return (
    <Screen>
      <motion.div className="absolute inset-0" animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <TopGlows id="s15" single />
      </motion.div>
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-h-px overflow-clip pt-[8px] px-[24px] relative w-full font-text">
        <motion.div {...rise(0)} className="flex gap-[8px] items-center">
          <motion.div animate={{ rotate: [0, -12, 0], opacity: [1, 0.6, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <Img src="moon.svg" size={16} />
          </motion.div>
          <p className="leading-[normal] text-[14px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Light sleep</p>
        </motion.div>
        <motion.div {...rise(1)} className="flex flex-col items-center whitespace-nowrap">
          <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.45)] tracking-[1.32px]">WAKE-UP BY</p>
          <div className="flex gap-[8px] items-end">
            <motion.p
              className="font-num font-extralight leading-[1.1] text-[104px] text-[rgba(255,255,255,0.85)]"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              1:30
            </motion.p>
            <p className="font-num font-light leading-[normal] text-[22px] text-[rgba(255,255,255,0.5)]">PM</p>
          </div>
          <button onClick={() => setLeft(0)} className="relative overflow-hidden h-[18px]" title="Skip to wake-up">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={left}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className="leading-[normal] text-[15px] text-[rgba(255,255,255,0.45)]"
              >
                {left > 0 ? `${left} min left` : "Waking you up…"}
              </motion.p>
            </AnimatePresence>
          </button>
        </motion.div>
        <motion.div {...rise(2)} className="flex flex-col gap-[8px] items-start pt-[12px] relative shrink-0 w-full">
          <div className="flex gap-[4px] items-center relative shrink-0 w-full">
            <div className="bg-[rgba(255,255,255,0.12)] flex-[10_0_0] h-[4px] min-w-px overflow-clip relative rounded-[2px]">
              <motion.div className="absolute grad-x h-[4px] left-0 top-0 w-full origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease, delay: 0.4 }} />
            </div>
            <div className="bg-[rgba(255,255,255,0.12)] flex-[18_0_0] h-[4px] min-w-px overflow-clip relative rounded-[2px]">
              <motion.div className="absolute grad-x h-[4px] left-0 top-0" initial={{ width: 0 }} animate={{ width: `${napFill}%` }} transition={{ duration: 0.9, ease }} />
            </div>
            <div className="bg-[rgba(255,255,255,0.12)] flex-[2_0_0] h-[4px] min-w-px relative rounded-[2px]" />
          </div>
          <div className="flex items-center justify-between leading-[normal] text-[12px] w-full whitespace-nowrap">
            <p className="text-[rgba(255,255,255,0.4)]">Settle in</p>
            <p className="text-[rgba(255,255,255,0.8)]">Nap</p>
            <p className="text-[rgba(255,255,255,0.4)]">Wake</p>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col gap-[12px] items-center overflow-clip pt-[16px] px-[24px] relative shrink-0 w-full font-text">
        <motion.div
          {...rise(3)}
          className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex items-center justify-between opacity-80 overflow-clip px-[20px] py-[14px] relative rounded-[24px] shrink-0 w-full"
        >
          <div className="flex flex-col gap-[2px] items-start leading-[normal] whitespace-nowrap">
            <p className="text-[14px] text-white">Temperature</p>
            <p className="text-[12px] text-[rgba(255,255,255,0.5)]">Autopilot is holding {state.temp > 0 ? "+" : ""}{state.temp}</p>
          </div>
          <Stepper value={state.temp} onChange={(temp) => set({ temp })} size={34} icon={14} text={24} minus="minus-14.svg" plus="plus-14.svg" />
        </motion.div>
        <ButtonSecondary label="End nap early" onClick={() => go("16", "fade")} />
      </div>
      <HomeIndicator />
    </Screen>
  );
}

/* ------------------------------ 16 No sleep ------------------------------ */

export function S16() {
  const { go } = useNav();
  const [added, setAdded] = useState(false);
  const add = () => {
    setAdded(true);
    setTimeout(() => go("15", "fade"), 900);
  };
  return (
    <Screen>
      <TopGlows id="s16" />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-px overflow-clip pt-[24px] px-[24px] relative w-full font-text">
        <motion.p {...rise(0)} className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.5)] tracking-[1.32px] w-full">1:30 PM, SESSION ENDED</motion.p>
        <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <motion.div {...rise(1)} className="text-[32px] text-white tracking-[-0.8px] w-full">
            <p className="leading-[1.12]">No sleep this time.</p>
            <p className="leading-[1.12]">Rest still counts.</p>
          </motion.div>
          <motion.p {...rise(2)} className="leading-[1.4] text-[16px] text-[rgba(255,255,255,0.6)] w-full">
            25 minutes of lying still with your eyes closed lowered your heart rate. That’s a real reset for your focus.
          </motion.p>
        </div>
        <div className="flex gap-[8px] items-center leading-[normal] relative shrink-0 w-full whitespace-nowrap">
          <motion.div {...rise(3)} className="bg-[rgba(255,255,255,0.05)] flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px p-[14px] rounded-[18px]">
            <p className="font-num font-light text-[24px] text-white"><CountUp to={25} /> min</p>
            <p className="text-[11px] text-[rgba(255,255,255,0.45)] tracking-[1.32px]">QUIET REST</p>
          </motion.div>
          <motion.div {...rise(4)} className="bg-[rgba(255,255,255,0.05)] flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px p-[14px] rounded-[18px]">
            <p className="font-num font-light text-[#59d98c] text-[24px]"><CountUp to={-6} /> bpm</p>
            <p className="text-[11px] text-[rgba(255,255,255,0.45)] tracking-[1.32px]">HEART RATE</p>
          </motion.div>
        </div>
        <motion.div
          {...rise(5)}
          className="border border-[rgba(255,255,255,0.14)] flex flex-col gap-[14px] items-start overflow-clip p-[20px] relative rounded-[24px] shrink-0 w-full"
          style={{
            backgroundImage:
              "linear-gradient(141.88deg, rgba(59, 92, 219, 0.45) 7.1429%, rgba(140, 97, 237, 0.3) 50%, rgba(245, 163, 122, 0.35) 78.571%), linear-gradient(90deg, rgb(20, 20, 31) 0%, rgb(20, 20, 31) 100%)",
          }}
        >
          <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.8)] tracking-[1.32px] w-full">ONE MORE TRY?</p>
          <p className="leading-[1.3] text-[18px] text-white tracking-[-0.18px] w-full">You took 22 min to settle in. Want 10 more minutes?</p>
          <div className="flex gap-[8px] items-center w-full">
            <StatusDot />
            <p className="leading-[normal] text-[13px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Pod 2F-B is free until 2:00 PM</p>
          </div>
          <div className="flex gap-[8px] items-center w-full">
            <Pill
              h={44}
              px={16}
              onClick={add}
              label={
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={String(added)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-[6px]">
                    {added ? (<><Check size={16} /> Until 1:40 PM</>) : "Add 10 min"}
                  </motion.span>
                </AnimatePresence>
              }
            />
            <Pill h={44} px={16} variant="ghost" label="I’m done" onClick={() => go("20", "rise")} />
          </div>
        </motion.div>
      </div>
      <div className="h-[100px] relative shrink-0 w-full" />
      <HomeIndicator />
    </Screen>
  );
}

/* ------------------------------ 17 Wake ------------------------------ */

const STAGES = [
  { f: 7, h: 11.2, c: "rgba(255,255,255,0.15)" },
  { f: 9, h: 19.2, c: "#7399ff" },
  { f: 4, h: 25.6, c: "#9973f2" },
  { f: 5, h: 19.2, c: "#7399ff" },
  { f: 3, h: 11.2, c: "rgba(255,255,255,0.15)" },
];

export function S17() {
  const { go, set } = useNav();
  const [picked, setPicked] = useState<number | null>(null);
  const pick = (n: number) => {
    if (picked) return;
    setPicked(n);
    set({ feeling: n });
    setTimeout(() => go("18"), 750);
  };
  return (
    <Screen>
      <TopGlows id="s17" />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-px overflow-clip pt-[24px] px-[24px] relative w-full font-text">
        <motion.p {...rise(0)} className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.55)] tracking-[1.32px] w-full">1:28 PM, SMART WAKE</motion.p>
        <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <motion.div {...rise(1)} className="text-[32px] text-white tracking-[-0.8px] w-full">
            <p className="leading-[1.12]">Welcome back.</p>
            <p className="leading-[1.12]">You slept 18 minutes.</p>
          </motion.div>
          <motion.p {...rise(2)} className="leading-[1.4] text-[16px] text-[rgba(255,255,255,0.6)] w-full">
            We woke you just before deep sleep, right in the sweet spot.
          </motion.p>
        </div>
        <motion.div {...rise(3)} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex flex-col gap-[10px] items-start overflow-clip p-[20px] relative rounded-[24px] shrink-0 w-full">
          <div className="flex gap-[2px] h-[32px] items-end relative shrink-0 w-[305px]">
            {STAGES.map((s, k) => (
              <motion.div
                key={k}
                className="min-w-px rounded-[4px] origin-bottom"
                style={{ flex: `${s.f} 0 0`, height: s.h, background: s.c }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ ...softSpring, delay: 0.5 + k * 0.12 }}
              />
            ))}
          </div>
          <div className="flex font-num font-normal items-center justify-between leading-[normal] text-[12px] text-[rgba(255,255,255,0.45)] w-full whitespace-nowrap">
            <p>1:00</p>
            <p>1:28</p>
          </div>
        </motion.div>
        <motion.div {...rise(4)} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[24px] shrink-0 w-full">
          <p className="leading-[normal] text-[18px] text-white tracking-[-0.18px] w-full">How do you feel?</p>
          <div className="flex items-center justify-between relative shrink-0 w-full">
            {[1, 2, 3, 4, 5].map((n) => {
              const on = picked === n;
              return (
                <motion.button
                  key={n}
                  onClick={() => pick(n)}
                  whileHover={picked ? undefined : { scale: 1.08, backgroundColor: "rgba(255,255,255,0.12)" }}
                  whileTap={{ scale: 0.9 }}
                  animate={on ? { scale: [1, 1.18, 1], backgroundColor: "#ffffff" } : { scale: 1, opacity: picked ? 0.4 : 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center rounded-[26px] shrink-0 size-[52px]"
                >
                  <p className="font-num font-normal leading-[normal] text-[20px] transition-colors" style={{ color: on ? "#000" : "rgba(255,255,255,0.8)" }}>
                    {n}
                  </p>
                </motion.button>
              );
            })}
          </div>
          <div className="flex items-center justify-between leading-[normal] text-[12px] text-[rgba(255,255,255,0.45)] w-full whitespace-nowrap">
            <p>Groggy</p>
            <p>Refreshed</p>
          </div>
        </motion.div>
      </div>
      <motion.div {...rise(5)} className="flex flex-col items-center overflow-clip pt-[16px] px-[24px] relative shrink-0 w-full">
        <ButtonSecondary label="Skip" onClick={() => go("18")} />
      </motion.div>
      <HomeIndicator />
    </Screen>
  );
}

/* ------------------------------ 18 Post-nap insight ------------------------------ */

export function S18() {
  const { go, back, state, set } = useNav();
  const slot = SLOTS[state.slot];
  const Stat = ({ v, l, green, i }: { v: React.ReactNode; l: string; green?: boolean; i: number }) => (
    <motion.div {...rise(i)} className="bg-[rgba(255,255,255,0.05)] flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px p-[12px] rounded-[18px]">
      <p className="font-num font-light text-[22px]" style={{ color: green ? "#59d98c" : "#fff" }}>{v}</p>
      <p className="text-[11px] text-[rgba(255,255,255,0.45)] tracking-[1.32px]">{l}</p>
    </motion.div>
  );
  return (
    <Screen>
      <TopGlows id="s18" />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px overflow-clip pt-[8px] px-[24px] relative w-full font-text">
        <div className="flex gap-[12px] items-center min-h-[44px] relative shrink-0 w-full">
          <IconButton src={A("back.svg")} onClick={back} />
          <p className="flex-[1_0_0] leading-[normal] min-w-px text-[16px] text-white">Your nap</p>
        </div>
        <div className="flex flex-col gap-[6px] items-start relative shrink-0 w-full">
          <motion.p {...rise(0)} className="leading-[1.1] text-[32px] text-white tracking-[-0.8px] w-full">A perfect nap</motion.p>
          <motion.div {...rise(1)} className="flex gap-[8px] items-center leading-[normal] text-[14px] whitespace-nowrap">
            <p className="text-[rgba(255,255,255,0.5)]">Today, {fmt(slot.t)} – {fmt(slot.t + 28)} PM</p>
            <p className="text-[rgba(255,255,255,0.25)]">|</p>
            <p className="text-[rgba(255,255,255,0.5)]">You felt {state.feeling} of 5</p>
          </motion.div>
        </div>
        <motion.div {...rise(2)} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex flex-col gap-[12px] items-start overflow-clip p-[20px] relative rounded-[24px] shrink-0 w-full">
          <div className="flex gap-[8px] items-end relative shrink-0 w-full whitespace-nowrap">
            <p className="font-num font-light leading-none text-[48px] text-white"><CountUp to={18} /></p>
            <p className="font-num font-normal leading-[normal] text-[13px] text-[rgba(255,255,255,0.6)]">MIN ASLEEP, IN THE SWEET SPOT</p>
          </div>
          <div className="flex gap-[3px] h-[10px] items-start relative shrink-0 w-[305px]">
            {[{ f: 14, c: "#7399ff" }, { f: 4, c: "#9973f2" }, { f: 1, c: "rgba(255,255,255,0.12)" }].map((s, k) => (
              <motion.div
                key={k}
                className="h-[10px] min-w-px rounded-[5px] origin-left"
                style={{ flex: `${s.f} 0 0`, background: s.c }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease, delay: 0.4 + k * 0.2 }}
              />
            ))}
          </div>
          <div className="flex gap-[16px] items-center leading-[normal] text-[12px] w-full whitespace-nowrap">
            <p className="text-[rgba(255,255,255,0.7)]">Light 14m</p>
            <p className="text-[rgba(255,255,255,0.7)]">REM 4m</p>
            <p className="text-[rgba(255,255,255,0.4)]">Deep 0m</p>
          </div>
        </motion.div>
        <div className="flex gap-[8px] items-center leading-[normal] relative shrink-0 w-full whitespace-nowrap">
          <Stat i={3} v="7 min" l="FELL ASLEEP" />
          <Stat i={4} v="-6 bpm" l="HEART RATE" green />
          <Stat i={5} v="+8 ms" l="HRV" green />
        </div>
        <motion.div {...rise(6)} className="bg-gradient-to-r border border-[rgba(255,255,255,0.1)] flex flex-col from-[rgba(59,92,219,0.28)] gap-[10px] items-start overflow-clip p-[20px] relative rounded-[24px] shrink-0 to-[rgba(140,97,237,0.12)] w-full">
          <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.7)] tracking-[1.32px] w-full">TONIGHT</p>
          <p className="leading-[1.4] text-[15px] text-white w-full">Bedtime stays 11:00 PM. A short, early nap won’t make it harder to fall asleep.</p>
          <div className="flex items-center justify-between leading-[normal] w-full whitespace-nowrap">
            <p className="text-[14px] text-[rgba(255,255,255,0.6)]">Sleep Fitness Score</p>
            <motion.p
              className="font-num font-normal text-[#59d98c] text-[18px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              +2
            </motion.p>
          </div>
        </motion.div>
        <motion.div {...rise(7)} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex gap-[12px] items-center overflow-clip p-[20px] relative rounded-[24px] shrink-0 w-full">
          <motion.div animate={state.routineSet ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 0.6, ease }}>
            <Img src="repeat.svg" size={22} />
          </motion.div>
          <div className="flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px">
            <p className="text-[15px] text-white w-full">{state.routineSet ? "Routine is on" : "Make it a routine"}</p>
            <p className="text-[13px] text-[rgba(255,255,255,0.55)] w-full">1:00 PM every Mon, Wed and Thu</p>
          </div>
          <Pill
            flex={false}
            h={36}
            px={16}
            onClick={() => set({ routineSet: !state.routineSet })}
            label={
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={String(state.routineSet)} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className="flex items-center">
                  {state.routineSet ? <Check size={16} /> : "Set"}
                </motion.span>
              </AnimatePresence>
            }
          />
        </motion.div>
        <div className="absolute bg-gradient-to-b bottom-0 from-[rgba(6,6,9,0)] h-[70px] left-0 right-0 to-[#060609] pointer-events-none" />
      </div>
      <motion.div {...rise(8)} className="flex flex-col items-center overflow-clip pt-[16px] px-[24px] relative shrink-0 w-full">
        <ButtonPrimary label="Done" onClick={() => go("20", "rise")} />
      </motion.div>
      <HomeIndicator />
    </Screen>
  );
}

/* ------------------------------ 19 Track ------------------------------ */

const WEEK = { n: 3, title: "naps this week", sub: "avg 17 min asleep", labels: ["M", "T", "W", "T", "F"], bars: [66, 0, 51.333, 69.667, 0] };
const MONTH = { n: 11, title: "naps this month", sub: "avg 16 min asleep", labels: ["W1", "W2", "W3", "W4", "W5"], bars: [58, 49, 62, 55, 66] };

export function S19() {
  const { go, back } = useNav();
  const [range, setRange] = useState("Week");
  const d = range === "Week" ? WEEK : MONTH;
  const lefts = [16.5, 77.5, 138.5, 199.5, 260.5];
  return (
    <Screen>
      <TopGlows id="s19" />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px overflow-clip pt-[8px] px-[24px] relative w-full font-text">
        <div className="flex gap-[12px] items-center min-h-[44px] relative shrink-0 w-full">
          <IconButton src={A("back.svg")} onClick={back} />
          <p className="flex-[1_0_0] leading-[normal] min-w-px text-[16px] text-white">Your rest</p>
        </div>
        <motion.div {...rise(0)} className="w-full">
          <Segmented id="range" options={["Week", "Month"]} value={range} onChange={setRange} h={34} />
        </motion.div>
        <motion.div {...rise(1)} className="flex gap-[12px] items-end relative shrink-0 w-full whitespace-nowrap">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p key={d.n} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ duration: 0.35, ease }} className="font-num font-light leading-none text-[64px] text-white">
                {d.n}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-[2px] items-start leading-[normal]">
            <p className="text-[16px] text-white">{d.title}</p>
            <p className="text-[14px] text-[rgba(255,255,255,0.5)]">{d.sub}</p>
          </div>
        </motion.div>
        <motion.div {...rise(2)} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex flex-col gap-[12px] items-start overflow-clip p-[20px] relative rounded-[24px] shrink-0 w-full">
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.5)] tracking-[1.32px] whitespace-nowrap">MINUTES ASLEEP</p>
            <div className="flex gap-[6px] items-center">
              <div className="bg-[rgba(255,255,255,0.12)] rounded-[2px] shrink-0 size-[10px]" />
              <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Sweet spot</p>
            </div>
          </div>
          <div className="h-[130px] relative shrink-0 w-full">
            <motion.div
              className="absolute bg-[rgba(255,255,255,0.07)] h-[36.667px] left-0 rounded-[6px] top-[36.67px] w-[305px] origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
            />
            {d.bars.map((h, k) => (
              <div key={k}>
                <motion.div
                  className={`absolute rounded-[8px] w-[28px] origin-bottom ${h ? "grad-y-rev" : "bg-[rgba(255,255,255,0.1)]"}`}
                  style={{ left: lefts[k], top: 110 - (h || 4), height: h || 4 }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  key={`${range}-${k}`}
                  transition={{ ...softSpring, delay: 0.45 + k * 0.07 }}
                />
                <p
                  className="-translate-x-1/2 absolute font-num font-normal leading-[normal] text-[12px] text-[rgba(255,255,255,0.45)] text-center top-[114px] w-[28px]"
                  style={{ left: lefts[k] + 14 }}
                >
                  {d.labels[k]}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="flex gap-[8px] items-start relative shrink-0 w-full">
          <motion.div {...rise(3)} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px p-[16px] rounded-[24px]">
            <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.5)] tracking-[1.32px] w-full">AFTERNOON ENERGY</p>
            <div className="flex gap-[4px] items-end w-full whitespace-nowrap">
              <p className="font-num font-light leading-none text-[30px] text-white"><CountUp to={4.2} format={(v) => v.toFixed(1)} /></p>
              <p className="font-num font-normal leading-[normal] text-[14px] text-[rgba(255,255,255,0.5)]">/5</p>
            </div>
            <p className="leading-[1.35] text-[#59d98c] text-[12px] w-full">+1.1 vs no-nap days</p>
          </motion.div>
          <motion.div {...rise(4)} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px p-[16px] rounded-[24px]">
            <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.5)] tracking-[1.32px] w-full">NIGHTS</p>
            <div className="flex gap-[4px] items-end w-full whitespace-nowrap">
              <p className="font-num font-light leading-none text-[30px] text-white"><CountUp to={-6} /></p>
              <p className="font-num font-normal leading-[normal] text-[14px] text-[rgba(255,255,255,0.5)]">MIN</p>
            </div>
            <p className="leading-[1.35] text-[12px] text-[rgba(255,255,255,0.55)] w-full">to fall asleep on nap days</p>
          </motion.div>
        </div>
        <motion.button
          {...rise(5)}
          whileTap={{ scale: 0.98 }}
          onClick={() => go("09")}
          className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex gap-[10px] items-center overflow-clip px-[16px] py-[14px] relative rounded-[20px] shrink-0 w-full text-left group"
        >
          <p className="flex-[1_0_0] leading-[normal] min-w-px text-[14px] text-white">Your best time: 1:00 PM</p>
          <div className="transition-transform group-hover:translate-x-[3px]">
            <Img src="chevron-18.svg" size={18} />
          </div>
        </motion.button>
      </div>
      <motion.div {...rise(6)} className="flex flex-col items-center overflow-clip pt-[16px] px-[24px] relative shrink-0 w-full font-text">
        <div className="flex gap-[10px] items-start relative shrink-0 w-full">
          <Img src="lock.svg" size={18} />
          <p className="flex-[1_0_0] leading-[1.4] min-w-px text-[13px] text-[rgba(255,255,255,0.55)]">
            Private to you. Questura di Milano only sees anonymous, company-wide totals.
          </p>
        </div>
      </motion.div>
      <HomeIndicator />
    </Screen>
  );
}
