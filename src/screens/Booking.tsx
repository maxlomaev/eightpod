import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { fmt, useNav } from "../nav";
import {
  A, ButtonPrimary, Check, HomeIndicator, IconButton, Img, Screen, Segmented, Spinner, StatusBar, StatusDot, Stepper, Toggle, TopGlows, ease, rise, softSpring, spring,
} from "../components/ui";

export const SLOTS = [
  { t: 12 * 60 + 30, text: "Full", kind: "full" as const, window: false },
  { t: 13 * 60, text: "Best for you, 3 pods free", kind: "free" as const, window: true },
  { t: 13 * 60 + 30, text: "2 pods free", kind: "free" as const, window: true },
  { t: 14 * 60, text: "3 pods free", kind: "free" as const, window: true, busy: true },
  { t: 14 * 60 + 30, text: "1 pod free", kind: "free" as const, window: true },
  { t: 15 * 60, text: "3 pods free", kind: "free" as const, window: true, busy: true },
  { t: 15 * 60 + 30, text: "3 pods free", kind: "free" as const, window: true },
  { t: 16 * 60, text: "Late, may affect tonight’s sleep", kind: "late" as const, window: false },
  { t: 16 * 60 + 30, text: "Late, may affect tonight’s sleep", kind: "late" as const, window: false },
];

const DATES = [
  { d: "Today", n: 21 },
  { d: "Mon", n: 23 },
  { d: "Tue", n: 24 },
  { d: "Wed", n: 25 },
  { d: "Thu", n: 26 },
];
const PODS = ["Any pod", "1F-A", "2F-A", "2F-B"];

export const dayLabel = (day: number) => (day === 0 ? "Today" : `${DATES[day].d} ${DATES[day].n}`);

/* ------------------------------ 09 Book a nap ------------------------------ */

export function S09() {
  const { go, back, state, set } = useNav();
  const [cal, setCal] = useState(false);
  const slot = SLOTS[state.slot];
  return (
    <Screen>
      <TopGlows id="s09" />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px overflow-clip pt-[8px] px-[24px] relative w-full font-text">
        <div className="flex gap-[12px] items-center relative shrink-0 w-full">
          <IconButton src={A("back.svg")} onClick={back} />
          <p className="flex-[1_0_0] leading-[normal] min-w-px text-[16px] text-white">Book a nap</p>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => go("13")}
            className="bg-white flex gap-[6px] items-center justify-center min-h-[36px] overflow-clip px-[16px] relative rounded-[18px] shrink-0"
          >
            <StatusDot size={7} src="status-dot-7.svg" />
            <p className="leading-[normal] text-[14px] text-black whitespace-nowrap">Nap now</p>
          </motion.button>
        </div>

        <motion.div {...rise(0)} className="flex gap-[8px] items-center leading-[normal] relative shrink-0 w-full whitespace-nowrap">
          {DATES.map((d, k) => {
            const on = state.day === k;
            return (
              <motion.button
                key={d.n}
                whileTap={{ scale: 0.94 }}
                onClick={() => set({ day: k })}
                className="flex flex-[1_0_0] flex-col gap-[2px] items-center min-w-px overflow-clip py-[10px] relative rounded-[18px] bg-[rgba(255,255,255,0.05)]"
              >
                {on && <motion.div layoutId="date-pill" className="absolute inset-0 bg-white rounded-[18px]" transition={spring} />}
                <p className="relative text-[12px] transition-colors" style={{ color: on ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.5)" }}>{d.d}</p>
                <p className="relative font-num font-normal text-[20px] transition-colors" style={{ color: on ? "#000" : "#fff" }}>{d.n}</p>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div {...rise(1)} className="flex gap-[8px] items-center relative shrink-0 w-full">
          {PODS.map((p) => {
            const on = state.pod === p;
            return (
              <motion.button
                key={p}
                whileTap={{ scale: 0.94 }}
                onClick={() => set({ pod: p })}
                className="flex items-center justify-center min-h-[34px] overflow-clip px-[14px] relative rounded-[17px] shrink-0 border transition-colors duration-200"
                style={{
                  background: on ? "rgba(255,255,255,0.14)" : "transparent",
                  borderColor: on ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)",
                }}
              >
                <p className="leading-[normal] text-[13px] whitespace-nowrap transition-colors" style={{ color: on ? "#fff" : "rgba(255,255,255,0.6)" }}>{p}</p>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div {...rise(2)} className="flex items-center justify-between relative shrink-0 w-full">
          <p className="leading-[normal] text-[14px] text-[rgba(255,255,255,0.7)] whitespace-nowrap">Show my calendar</p>
          <Toggle on={cal} onChange={setCal} />
        </motion.div>

        <div className="no-scrollbar flex flex-col gap-[6px] items-start relative w-full flex-[1_0_0] min-h-0 overflow-y-auto pb-[60px]">
          <AnimatePresence mode="popLayout">
            {SLOTS.map((s, k) => {
              const selected = state.slot === k;
              const disabled = s.kind === "full";
              return (
                <motion.div
                  key={`${state.day}-${k}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.15 + k * 0.035 }}
                  className="flex gap-[12px] items-center relative shrink-0 w-full"
                >
                  <p
                    className="font-num font-normal leading-[normal] text-[15px] w-[38px] shrink-0 transition-colors"
                    style={{ color: disabled ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.6)" }}
                  >
                    {fmt(s.t)}
                  </p>
                  <div className={`h-[44px] rounded-[2px] shrink-0 w-[3px] ${s.window ? "grad-y" : "bg-[rgba(255,255,255,0.06)]"}`} />
                  <motion.button
                    disabled={disabled}
                    whileTap={disabled ? undefined : { scale: 0.98 }}
                    onClick={() => set({ slot: k })}
                    className={`flex flex-[1_0_0] gap-[8px] items-center min-h-[44px] min-w-px overflow-clip px-[14px] relative rounded-[14px] text-left ${
                      disabled ? "cursor-not-allowed" : ""
                    }`}
                    style={{
                      background: disabled ? "rgba(255,255,255,0.03)" : s.kind === "late" ? "rgba(255,184,89,0.07)" : "rgba(255,255,255,0.05)",
                    }}
                  >
                    {selected && (
                      <motion.div layoutId="slot-sel" className="absolute inset-0 rounded-[14px] grad-border" transition={spring} />
                    )}
                    {s.kind === "late" && <Img src="warning.svg" size={14} className="relative" />}
                    <p
                      className="relative leading-[normal] whitespace-nowrap"
                      style={{
                        fontSize: s.kind === "late" ? 13 : 14,
                        color:
                          s.kind === "late" ? "rgba(255,184,89,0.9)" : disabled ? "rgba(255,255,255,0.25)" : selected ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
                      }}
                    >
                      {s.text}
                    </p>
                    <AnimatePresence>
                      {cal && s.busy && (
                        <motion.span
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          className="relative ml-auto text-[12px] text-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.06)] rounded-[8px] px-[8px] py-[3px]"
                        >
                          Busy
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="absolute bg-gradient-to-b bottom-0 from-[rgba(6,6,9,0)] h-[90px] left-0 right-0 to-[#060609] pointer-events-none" />
      </div>
      <div className="flex flex-col gap-[12px] items-center overflow-clip pt-[16px] px-[24px] relative shrink-0 w-full font-text">
        <div className="flex gap-[8px] items-center justify-center leading-[normal] text-[14px] w-full whitespace-nowrap">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={`${state.day}-${slot.t}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="text-white"
            >
              {dayLabel(state.day)}, {fmt(slot.t)} – {fmt(slot.t + 30)} PM
            </motion.p>
          </AnimatePresence>
          <p className="text-[rgba(255,255,255,0.25)]">|</p>
          <p className="text-[rgba(255,255,255,0.55)]">{state.pod === "Any pod" ? "Any free pod" : `Pod ${state.pod}`}</p>
        </div>
        <ButtonPrimary label="Continue" onClick={() => go("10")} />
      </div>
      <HomeIndicator />
    </Screen>
  );
}

/* ------------------------------ 10 Customize ------------------------------ */

const SOUNDS = ["Pink noise", "Rain", "Brown noise", "Off"];

export function S10() {
  const { go, back, state, set } = useNav();
  const [sound, setSound] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const slot = SLOTS[state.slot];
  const pod = state.pod === "Any pod" ? "2F-B" : state.pod;
  const confirm = () => {
    if (phase !== "idle") return;
    setPhase("loading");
    setTimeout(() => setPhase("done"), 900);
    setTimeout(() => go("11", "rise"), 1400);
  };
  return (
    <Screen>
      <TopGlows id="s10" />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px overflow-clip pt-[8px] px-[24px] relative w-full font-text">
        <div className="flex gap-[12px] items-center relative shrink-0 w-full">
          <IconButton src={A("back.svg")} onClick={back} />
          <p className="flex-[1_0_0] leading-[normal] min-w-px text-[16px] text-white">Your nap</p>
        </div>
        <motion.div {...rise(0)} className="flex flex-col gap-[6px] items-start relative shrink-0 w-full whitespace-nowrap">
          <div className="flex gap-[10px] items-end relative shrink-0">
            <p className="font-num font-light leading-none text-[56px] text-white">{fmt(slot.t)}</p>
            <p className="font-num font-normal leading-[normal] text-[18px] text-[rgba(255,255,255,0.6)]">PM, {dayLabel(state.day).toUpperCase()}</p>
          </div>
          <div className="flex gap-[8px] items-center leading-[normal] text-[14px]">
            <p className="text-[rgba(255,255,255,0.55)]">30 min</p>
            <p className="text-[rgba(255,255,255,0.25)]">|</p>
            <p className="text-[rgba(255,255,255,0.55)]">Pod {pod}, {pod.startsWith("1") ? "1st" : "2nd"} floor</p>
          </div>
        </motion.div>
        <motion.div
          {...rise(1)}
          className="bg-gradient-to-r border border-[rgba(255,255,255,0.1)] flex from-[rgba(59,92,219,0.28)] gap-[12px] items-center overflow-clip px-[16px] py-[14px] relative rounded-[20px] shrink-0 to-[rgba(140,97,237,0.12)] w-full"
        >
          <motion.div
            className="bg-white flex items-center justify-center rounded-[10px] shrink-0 size-[32px]"
            initial={{ rotate: -12, scale: 0.7 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ ...softSpring, delay: 0.3 }}
          >
            <p className="font-num font-normal leading-[normal] text-[18px] text-black">8</p>
          </motion.div>
          <div className="flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px">
            <p className="leading-[normal] text-[14px] text-white w-full">Using your night settings</p>
            <p className="leading-[1.35] text-[13px] text-[rgba(255,255,255,0.6)] w-full">Tuned by Autopilot. All set, change anything below.</p>
          </div>
        </motion.div>
        <motion.div
          {...rise(2)}
          className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex flex-col items-start overflow-clip px-[20px] py-[4px] relative rounded-[24px] shrink-0 w-full"
        >
          <div className="flex items-center justify-between py-[16px] relative shrink-0 w-full">
            <div className="flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px whitespace-nowrap">
              <p className="leading-[normal] text-[15px] text-white">Temperature</p>
              <p className="leading-[1.35] text-[12px] text-[rgba(255,255,255,0.5)]">{state.temp > 0 ? "Warmer, cosy start" : "Cooler helps you fall asleep"}</p>
            </div>
            <Stepper value={state.temp} onChange={(temp) => set({ temp })} />
          </div>
          <div className="bg-[rgba(255,255,255,0.08)] h-px relative shrink-0 w-full" />
          <div className="flex flex-col gap-[12px] items-start py-[16px] relative shrink-0 w-full">
            <div className="flex flex-col gap-[3px] items-start w-full whitespace-nowrap">
              <p className="leading-[normal] text-[15px] text-white">Wake-up</p>
              <p className="leading-[1.35] text-[12px] text-[rgba(255,255,255,0.5)]">Silent, office friendly</p>
            </div>
            <Segmented id="wake" options={["Vibration", "Thermal", "Both"]} value={state.wakeMode} onChange={(wakeMode) => set({ wakeMode })} />
          </div>
          <div className="bg-[rgba(255,255,255,0.08)] h-px relative shrink-0 w-full" />
          <button onClick={() => setSound((sound + 1) % SOUNDS.length)} className="flex items-center justify-between py-[16px] relative shrink-0 w-full group">
            <p className="leading-[normal] text-[15px] text-white whitespace-nowrap">Sound</p>
            <div className="flex gap-[4px] items-center">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={sound}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="leading-[normal] text-[14px] text-[rgba(255,255,255,0.55)] whitespace-nowrap"
                >
                  {SOUNDS[sound]}
                </motion.p>
              </AnimatePresence>
              <div className="transition-transform group-hover:translate-x-[2px]">
                <Img src="chevron-18.svg" size={18} />
              </div>
            </div>
          </button>
          <div className="bg-[rgba(255,255,255,0.08)] h-px relative shrink-0 w-full" />
          <div className="flex items-center justify-between py-[16px] relative shrink-0 w-full">
            <div className="flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px">
              <p className="leading-[normal] text-[15px] text-white whitespace-nowrap">Smart wake</p>
              <p className="leading-[1.35] text-[12px] text-[rgba(255,255,255,0.5)] w-[220px]">Wakes you before deep sleep, so you don’t feel groggy</p>
            </div>
            <Toggle on={state.smartWake} onChange={(smartWake) => set({ smartWake })} />
          </div>
        </motion.div>
      </div>
      <motion.div {...rise(3)} className="flex flex-col items-center overflow-clip pt-[16px] px-[24px] relative shrink-0 w-full">
        <ButtonPrimary
          onClick={confirm}
          label={
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={phase} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
                {phase === "idle" && "Confirm booking"}
                {phase === "loading" && (<><Spinner /> Booking…</>)}
                {phase === "done" && (<><Check /> Booked</>)}
              </motion.span>
            </AnimatePresence>
          }
        />
      </motion.div>
      <HomeIndicator />
    </Screen>
  );
}

/* ------------------------------ 11 Booked ------------------------------ */

const modeText = (m: string) => (m === "Both" ? "vibration and thermal" : m.toLowerCase());

export function S11() {
  const { go, state } = useNav();
  const [calOn, setCalOn] = useState(true);
  const [slackOn, setSlackOn] = useState(true);
  const slot = SLOTS[state.slot];
  const pod = state.pod === "Any pod" ? "2F-B" : state.pod;
  const Row = ({ k, v }: { k: string; v: string }) => (
    <div className="flex items-center justify-between leading-[normal] py-[12px] relative shrink-0 text-[14px] w-full whitespace-nowrap">
      <p className="text-[rgba(255,255,255,0.5)]">{k}</p>
      <p className="text-white">{v}</p>
    </div>
  );
  return (
    <Screen>
      <TopGlows id="s11" />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px overflow-clip pt-[8px] px-[24px] relative w-full font-text">
        <div className="h-[249px] overflow-clip relative rounded-[28px] shrink-0 w-full">
          {[0, 1].map((r) => (
            <motion.div
              key={r}
              className="absolute left-1/2 top-[55%] size-[180px] -ml-[90px] -mt-[90px] rounded-full border border-[rgba(140,97,237,0.6)]"
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeOut", delay: 0.25 + r * 0.35 }}
            />
          ))}
          <motion.div
            className="absolute h-[245px] left-[26px] top-0 w-[293px]"
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{ opacity: { duration: 0.6 }, scale: { ...softSpring }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 } }}
          >
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A("s01-pod.png")} />
          </motion.div>
        </div>
        <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          <motion.p {...rise(1)} className="leading-[1.1] text-[34px] text-white tracking-[-0.85px] w-full">You’re booked</motion.p>
          <motion.p {...rise(2)} className="leading-[1.4] text-[16px] text-[rgba(255,255,255,0.6)] w-full">
            We’ll remind you 10 minutes before and pre-cool the pod.
          </motion.p>
        </div>
        <motion.div {...rise(3)} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex flex-col items-start overflow-clip px-[20px] py-[6px] relative rounded-[24px] shrink-0 w-full">
          <Row k="When" v={`${dayLabel(state.day)}, ${fmt(slot.t)} – ${fmt(slot.t + 30)} PM`} />
          <div className="bg-[rgba(255,255,255,0.07)] h-px shrink-0 w-full" />
          <Row k="Where" v={`Pod ${pod}, ${pod.startsWith("1") ? "1st" : "2nd"} floor`} />
          <div className="bg-[rgba(255,255,255,0.07)] h-px shrink-0 w-full" />
          <Row k="Settings" v={`${state.temp > 0 ? "+" : ""}${state.temp}, ${modeText(state.wakeMode)}`} />
        </motion.div>
        <motion.div {...rise(4)} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex flex-col items-start overflow-clip px-[20px] py-[6px] relative rounded-[24px] shrink-0 w-full">
          <div className="flex gap-[12px] items-center py-[10px] relative shrink-0 w-full">
            <div className="flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px">
              <p className="text-[14px] text-white w-full">Add to work calendar</p>
              <p className="text-[12px] text-[rgba(255,255,255,0.5)] w-full">
                {calOn ? `Blocks ${fmt(slot.t)} – ${fmt(slot.t + 30)} PM` : "Not added"}
              </p>
            </div>
            <Toggle on={calOn} onChange={setCalOn} />
          </div>
          <div className="bg-[rgba(255,255,255,0.07)] h-px shrink-0 w-full" />
          <div className="flex gap-[12px] items-center py-[10px] relative shrink-0 w-full">
            <div className="flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px">
              <p className="text-[14px] text-white w-full">Slack status</p>
              <p className="text-[12px] text-[rgba(255,255,255,0.5)] w-full">{slackOn ? `“Resting, back at ${fmt(slot.t + 35)} PM”` : "Off"}</p>
            </div>
            <Toggle on={slackOn} onChange={setSlackOn} />
          </div>
        </motion.div>
      </div>
      <motion.div {...rise(5)} className="flex flex-col items-center overflow-clip pt-[16px] px-[24px] relative shrink-0 w-full">
        <ButtonPrimary label="Done" onClick={() => go("12", "fade")} />
      </motion.div>
      <HomeIndicator />
    </Screen>
  );
}
