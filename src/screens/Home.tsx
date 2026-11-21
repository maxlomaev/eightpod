import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNav, type ScreenId } from "../nav";
import {
  A, Check, HomeIndicator, IconButton, Img, Pill, Screen, StatusBar, StatusDot, TopGlows, ease, rise, softSpring, spring,
} from "../components/ui";

/* ------------------------------ Tab bar (12:129) ------------------------------ */

export function TabBar({ active, home = "06" }: { active: "home" | "pod" | "data"; home?: ScreenId }) {
  const { go, screen } = useNav();
  const tabs = [
    { k: "home", icon: "tab-home.svg", to: home },
    { k: "pod", icon: "tab-pod.svg", to: "08" },
    { k: "data", icon: "tab-data.svg", to: "19" },
  ] as const;
  return (
    <div className="sticky bottom-0 z-20 flex flex-col items-center relative shrink-0 w-full mt-auto pointer-events-none">
      <div className="flex h-[72px] items-center justify-center relative shrink-0 w-full">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...softSpring, delay: 0.2 }}
          className="pointer-events-auto backdrop-blur-[10px] bg-[rgba(31,31,36,0.9)] border border-[rgba(255,255,255,0.08)] flex gap-[8px] items-start overflow-clip p-[8px] relative rounded-[32px] shrink-0"
        >
          {tabs.map((t) => (
            <motion.button
              key={t.k}
              whileTap={{ scale: 0.9 }}
              onClick={() => t.to !== screen && go(t.to, "fade")}
              className="flex h-[44px] items-center justify-center overflow-clip relative rounded-[22px] shrink-0 w-[64px]"
            >
              {active === t.k && (
                <motion.div layoutId="tab-pill" className="absolute inset-0 bg-[rgba(255,255,255,0.12)] rounded-[22px]" transition={spring} />
              )}
              <Img src={t.icon} size={22} />
            </motion.button>
          ))}
        </motion.div>
      </div>
      <HomeIndicator />
    </div>
  );
}

/* ------------------------------ shared home blocks ------------------------------ */

const glassPill =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 28' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(7.841e-14 3.3535 -15.57 1.2774e-13 120 -5.5349)'><stop stop-color='rgba(255,255,255,1)' offset='0'/><stop stop-color='rgba(255,255,255,0.1)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)";
const glassCard =
  "linear-gradient(90deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.12) 100%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 362 134' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.30000001192092896'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(7.5022e-15 16.122 -31.884 4.8604e-13 181 -27.219)'><stop stop-color='rgba(255,255,255,1)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='0.71889'/></radialGradient></defs></svg>\")";
const hrvBg =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 361 432' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.25'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.0000012039 21.6 -22.169 0.000001304 180.5 432)'><stop stop-color='rgba(255,255,255,1)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 361 432' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.0000034067 -97.018 91.099 -21.228 180.5 941.55)'><stop stop-color='rgba(19,30,15,1)' offset='0'/><stop stop-color='rgba(21,21,21,1)' offset='1'/></radialGradient></defs></svg>\")";

function FeedbackBtn({ src, flip }: { src: string; flip?: boolean }) {
  const [on, setOn] = useState(false);
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      animate={on ? { scale: [1, 1.25, 1], rotate: flip ? [0, 12, 0] : [0, -12, 0] } : { scale: 1 }}
      transition={{ duration: 0.4 }}
      onClick={() => setOn(!on)}
      className="flex items-center justify-center relative shrink-0 size-[44px] rounded-full"
      style={{ opacity: on ? 1 : 0.85 }}
    >
      <Img src={src} size={24} />
      {on && <motion.span layoutId={undefined} className="absolute bottom-[8px] size-[4px] rounded-full bg-white" initial={{ scale: 0 }} animate={{ scale: 1 }} />}
    </motion.button>
  );
}

function HomeHeader() {
  return (
    <div className="flex flex-col gap-[40px] items-start relative shrink-0 w-[394px]">
      <div className="flex flex-col gap-[24px] items-start justify-center relative shrink-0 w-[402px]">
        <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
            <div className="flex h-[48px] items-center justify-between pl-[16px] pr-[8px] relative shrink-0 w-full">
              <motion.div {...rise(0)} className="flex flex-[1_0_0] h-full items-center min-w-px">
                <Img src="logo-8s.svg" size={[67.517, 28]} />
              </motion.div>
              <motion.div {...rise(0)} className="flex flex-[1_0_0] items-center justify-end min-w-px">
                <div className="flex items-center justify-center relative shrink-0 size-[44px]">
                  <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5 }}>
                    <Img src="icon-bolt.svg" size={20} />
                  </motion.div>
                  <p className="font-num font-normal h-[14px] leading-none text-[18px] text-white text-center tracking-[0.72px] w-[7px]">7</p>
                </div>
                <motion.button whileTap={{ scale: 0.85 }} className="flex items-center justify-center shrink-0 size-[44px]">
                  <Img src="icon-menu.svg" size={24} />
                </motion.button>
              </motion.div>
            </div>
            <div className="flex flex-col gap-[16px] items-start px-[16px] relative shrink-0 w-full font-text">
              <motion.p {...rise(1)} className="font-medium leading-[1.2] text-[rgba(255,255,255,0.5)] text-[18px] tracking-[0.18px] w-[179px]">
                Good morning, Matteo
              </motion.p>
              <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <motion.p {...rise(2)} className="font-medium leading-[1.2] text-[36px] text-white tracking-[-0.36px] w-full">
                  You didn’t get enough rest last night
                </motion.p>
                <motion.p {...rise(3)} className="leading-[1.5] text-[17px] text-white tracking-[0.17px] w-full">
                  Last night, you only slept for 4h 27m, which is significantly less than your usual. This short sleep duration can impact your physical and mental recovery, making you feel sluggish and tired today. You’ll need more time to repair and recharge tonight.
                </motion.p>
                <motion.button
                  {...rise(4)}
                  whileTap={{ scale: 0.97 }}
                  className="backdrop-blur-[10px] border border-[rgba(255,255,255,0.7)] flex h-[28px] items-center px-[8px] py-[4px] relative rounded-[32px] shrink-0 w-[240px]"
                  style={{ backgroundImage: glassPill }}
                >
                  <div className="flex gap-[4px] items-center relative shrink-0">
                    <div className="relative shrink-0 size-[12px]">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A("apple-health.png")} />
                    </div>
                    <p className="font-medium leading-[1.2] text-[15px] text-white text-right tracking-[0.15px] whitespace-nowrap">Enhanced with Apple Health</p>
                  </div>
                  <Img src="icon-chevron-right.svg" size={20} />
                </motion.button>
              </div>
            </div>
          </div>
          <motion.div {...rise(5)} className="flex items-center px-[8px] relative shrink-0">
            <FeedbackBtn src="icon-thumb-up.svg" />
            <FeedbackBtn src="icon-thumb-down.svg" flip />
            <FeedbackBtn src="icon-share.svg" />
          </motion.div>
        </div>
      </div>
      <motion.div {...rise(6)} className="flex flex-col items-start px-[16px] relative shrink-0 w-full font-text">
        <div className="border border-[rgba(255,255,255,0.7)] flex flex-col gap-[8px] h-[134px] items-start p-[16px] relative rounded-[20px] shadow-[2px_2px_64px_0px_rgba(0,0,0,0.2)] shrink-0 w-full">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[20px]" style={{ backgroundImage: glassCard }} />
          <div className="flex h-[16px] items-center relative shrink-0 w-[338px]">
            <p className="font-medium leading-[1.2] text-white text-[12px] tracking-[2.4px] uppercase whitespace-nowrap">try this tonight</p>
          </div>
          <p className="leading-[1.5] relative text-[17px] text-white tracking-[0.17px] w-[338px]">
            Your deep sleep efficiency is strong. Adding 30-45 minutes tonight could compound that recovery. Wind down 30 minutes earlier
          </p>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_8px_12px_0px_rgba(255,255,255,0.09),inset_0px_-4px_12px_0px_rgba(255,255,255,0.08),inset_0px_0px_8px_0px_rgba(255,255,255,0.25)]" />
        </div>
      </motion.div>
    </div>
  );
}

function Tile({ value, dot, sub, label }: { value: string; dot: string; sub?: string; label: string }) {
  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      className="bg-[rgba(255,255,255,0.08)] flex flex-col gap-[8px] items-start overflow-clip relative rounded-[16px] shrink-0 w-[130px] cursor-pointer"
    >
      <div className={`flex items-center justify-between px-[12px] py-[16px] relative shrink-0 w-full ${sub ? "h-[52px]" : ""}`}>
        <div className="flex gap-[4px] items-center relative shrink-0 w-[57.5px]">
          <p className="font-num font-normal leading-[1] text-[24px] text-white tracking-[0.96px] whitespace-nowrap">{value}</p>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <Img src={dot} size={4} />
          </motion.div>
        </div>
        {sub && (
          <p className="flex-[1_0_0] font-num font-normal self-end leading-[20px] min-w-px text-[14px] text-[rgba(255,255,255,0.5)] text-right tracking-[0.56px] whitespace-nowrap">
            {sub}
          </p>
        )}
      </div>
      <div className="flex items-center p-[12px] relative shrink-0 w-full">
        <p className="font-text font-medium leading-[1.2] text-white text-[12px] tracking-[2.4px] uppercase whitespace-nowrap">{label}</p>
      </div>
    </motion.div>
  );
}

function Metrics() {
  return (
    <div className="no-scrollbar flex gap-[8px] h-[97px] items-center relative shrink-0 w-[calc(100%+32px)] -mx-[16px] px-[16px] overflow-x-auto">
      <Tile value="92" dot="dot.svg" label="SLEEP SCORE" />
      <Tile value="8%" dot="dot1.svg" sub="1h 18m" label="deep sleep" />
      <Tile value="23%" dot="dot.svg" sub="1h 52m" label="REM sleep" />
      {[0, 1].map((k) => (
        <div key={k} className="border border-[rgba(255,255,255,0.2)] border-dashed flex h-[97px] items-center justify-center overflow-clip relative rounded-[16px] shrink-0 w-[130px]">
          <Img src="icon-departure.svg" size={24} />
        </div>
      ))}
    </div>
  );
}

function HrvCard() {
  const bar = (w: string, color: string, d: number) => (
    <motion.div
      className="h-[26px] rounded-[4px] origin-left"
      style={{ background: color, width: w }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1, ease, delay: d }}
    />
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease }}
      className="flex flex-col gap-[32px] items-center overflow-clip py-[20px] relative rounded-[24px] shrink-0 w-full font-text"
      style={{ backgroundImage: hrvBg }}
    >
      <div className="flex gap-[8px] items-center justify-center px-[20px] relative shrink-0 w-full">
        <p className="flex-[1_0_0] font-medium leading-[1.2] min-w-px text-white text-[12px] tracking-[2.4px] uppercase">hrv strength</p>
      </div>
      <div className="flex flex-col gap-[20px] items-start px-[20px] relative shrink-0 w-full">
        <div className="flex flex-col gap-[8px] items-start relative shrink-0">
          <p className="font-medium leading-[1.2] text-[17px] text-white tracking-[0.17px] w-[169px]">Population average</p>
          <div className="flex gap-[12px] items-center relative shrink-0 w-[243px]">
            <div className="flex-[1_0_0] min-w-px">{bar("100%", "rgba(255,255,255,0.1)", 0.1)}</div>
            <p className="font-num font-normal leading-[1.4] text-[18px] text-white tracking-[0.72px] whitespace-nowrap">32 ms</p>
          </div>
        </div>
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <p className="font-medium leading-[1.2] text-[17px] text-white tracking-[0.17px] w-[105px]">Last night</p>
          <div className="flex gap-[12px] items-center relative shrink-0 w-full">
            <div className="flex-[1_0_0] min-w-px">{bar("100%", "#adcf99", 0.35)}</div>
            <p className="font-num font-normal leading-[1.4] text-[18px] text-white tracking-[0.72px] whitespace-nowrap">56 ms</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[16px] items-start px-[20px] relative shrink-0 w-full">
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <p className="font-medium leading-[1.2] text-[20px] text-white tracking-[0.4px] w-full">Your HRV places you in the top 10% for members like you</p>
          <p className="leading-[1.5] text-[17px] text-[rgba(255,255,255,0.5)] tracking-[0.17px] w-full">
            Your HRV reached 56 ms last night, nearly double the 32 ms population average. This means your heart can flexibly shift between stress and rest — a sign your nervous system is adapting well.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const card = "bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex flex-col items-start overflow-clip p-[20px] relative rounded-[24px] shrink-0 w-full";

function WidgetHead({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center justify-between relative shrink-0 w-full group">
      <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.5)] tracking-[1.32px] whitespace-nowrap">REST POD</p>
      <motion.div className="transition-transform group-hover:translate-x-[3px]">
        <Img src="chevron-18.svg" size={18} />
      </motion.div>
    </button>
  );
}

function PodThumb({ size }: { size: number }) {
  return (
    <motion.div
      className="relative rounded-[16px] shrink-0 overflow-hidden"
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.img
        alt=""
        className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full"
        src={A("pod-thumb.png")}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function RestPodWidget() {
  const { go } = useNav();
  return (
    <div className={`${card} gap-[16px] font-text`}>
      <WidgetHead onClick={() => go("08")} />
      <div className="flex gap-[14px] items-center relative shrink-0 w-full">
        <div className="flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px">
          <p className="leading-[normal] text-[20px] text-white tracking-[-0.2px] w-full">2 of 3 pods free</p>
          <p className="leading-[1.35] text-[13px] text-[rgba(255,255,255,0.55)] w-full">Your nap window: 1:00 – 4:00 PM</p>
        </div>
        <PodThumb size={72} />
      </div>
      <div className="flex gap-[8px] items-center relative shrink-0 w-full">
        <Pill label="Nap now" onClick={() => go("13")} />
        <Pill label="Book" variant="ghost" onClick={() => go("09")} />
      </div>
    </div>
  );
}

function Nudge({ onDismiss }: { onDismiss: () => void }) {
  const { go } = useNav();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0, scale: 0.96, marginBottom: -12 }}
      animate={{ opacity: 1, height: "auto", scale: 1, marginBottom: 0 }}
      exit={{ opacity: 0, height: 0, scale: 0.96, marginBottom: -12 }}
      transition={{ duration: 0.6, ease }}
      className="relative shrink-0 w-full overflow-hidden rounded-[24px]"
    >
      <div
        className="border border-[rgba(255,255,255,0.14)] flex flex-col gap-[14px] items-start overflow-clip p-[20px] relative rounded-[24px] w-full font-text"
        style={{
          backgroundImage:
            "linear-gradient(135.29deg, rgba(59, 92, 219, 0.55) 7.1429%, rgba(140, 97, 237, 0.35) 50%, rgba(245, 163, 122, 0.45) 78.571%), linear-gradient(90deg, rgb(20, 20, 31) 0%, rgb(20, 20, 31) 100%)",
        }}
      >
        <motion.div
          className="absolute -inset-[40%] pointer-events-none"
          style={{ background: "radial-gradient(closest-side, rgba(245,163,122,0.22), transparent)" }}
          animate={{ x: ["-10%", "25%", "-10%"], y: ["10%", "-5%", "10%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="flex gap-[6px] items-center relative shrink-0 w-full">
          <motion.div animate={{ rotate: [0, 180], scale: [1, 1.25, 1] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1 }}>
            <Img src="sparkle-14.svg" size={14} />
          </motion.div>
          <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.8)] tracking-[1.32px] whitespace-nowrap">REST POD FOR YOU</p>
        </div>
        <div className="relative shrink-0 text-[24px] text-white tracking-[-0.48px] w-full">
          <p className="leading-[1.15]">Your afternoon dip</p>
          <p className="leading-[1.15]">starts soon</p>
        </div>
        <p className="leading-[1.4] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] w-full">
          You slept 5h 40m last night. A short nap at 1:10 PM can bring your focus back.
        </p>
        <div className="flex gap-[8px] items-center relative shrink-0 w-full">
          <StatusDot />
          <p className="leading-[normal] text-[13px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Pod 2F-B is free at 1:10 PM</p>
        </div>
        <div className="flex gap-[8px] items-center relative shrink-0 w-full">
          <Pill label="Book 1:10 PM" h={44} onClick={() => go("10")} />
          <Pill label="Not today" variant="ghost" h={44} onClick={onDismiss} />
        </div>
      </div>
    </motion.div>
  );
}

function TodayTimeline() {
  return (
    <motion.div {...rise(1)} className={`${card} gap-[12px] font-text`}>
      <div className="flex items-center justify-between relative shrink-0 w-full">
        <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.5)] tracking-[1.32px] whitespace-nowrap">TODAY</p>
      </div>
      <div className="h-[24px] relative shrink-0 w-full">
        <div className="absolute bg-[rgba(255,255,255,0.06)] h-[24px] left-0 rounded-[8px] top-0 w-[305px]" />
        <motion.div
          className="absolute bg-[#4059d9] h-[24px] left-0 rounded-[8px] top-0 w-[88.958px] origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.4 }}
        />
        <motion.div
          className="absolute grad-y-rev h-[24px] left-[165.21px] rounded-[4px] top-0 w-[10px]"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ ...softSpring, delay: 1.1 }}
        />
        <motion.div
          className="absolute bg-white h-[32px] left-[180.46px] top-[-4px] w-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.35, 1] }}
          transition={{ duration: 2.4, delay: 1.3, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>
      <div className="flex font-num font-normal items-center justify-between leading-[normal] text-[12px] text-[rgba(255,255,255,0.45)] w-full whitespace-nowrap">
        <p>12a</p><p>6a</p><p>12p</p><p>6p</p><p>12a</p>
      </div>
      <div className="flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="flex gap-[6px] items-center">
          <div className="bg-[#4059d9] rounded-[3px] shrink-0 size-[10px]" />
          <p className="leading-[normal] text-[12px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Night 7h 30m</p>
        </div>
        <div className="flex gap-[6px] items-center">
          <div className="grad-y-rev rounded-[3px] shrink-0 size-[10px]" />
          <p className="leading-[normal] text-[12px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Rest Pod nap 18m</p>
        </div>
      </div>
    </motion.div>
  );
}

function WidgetAfterNap() {
  const { go, state, set } = useNav();
  return (
    <motion.div {...rise(2)} className={`${card} gap-[14px] font-text`}>
      <WidgetHead onClick={() => go("08")} />
      <div className="flex gap-[14px] items-center relative shrink-0 w-full">
        <div className="flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px">
          <p className="leading-[normal] text-[20px] text-white tracking-[-0.2px] w-full">Nice nap, Alex</p>
          <p className="leading-[1.35] text-[13px] text-[rgba(255,255,255,0.55)] w-full">
            18 min asleep, you felt {state.feeling} of 5. Same time tomorrow?
          </p>
        </div>
        <PodThumb size={64} />
      </div>
      <div className="flex items-center relative shrink-0 w-full">
        <Pill
          variant="ghost"
          onClick={() => set({ bookedTomorrow: !state.bookedTomorrow })}
          className={state.bookedTomorrow ? "!bg-white !border-white" : ""}
          label={
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={String(state.bookedTomorrow)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-[6px]"
                style={{ color: state.bookedTomorrow ? "#000" : "#fff" }}
              >
                {state.bookedTomorrow ? (<><Check size={16} /> Booked for tomorrow, 1:00 PM</>) : "Book 1:00 PM tomorrow"}
              </motion.span>
            </AnimatePresence>
          }
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------ 06 / 07 / 20 ------------------------------ */

function Home({ variant }: { variant: "widget" | "nudge" | "after" }) {
  const [nudge, setNudge] = useState(variant === "nudge");
  useEffect(() => {
    if (variant !== "widget") return;
    const t = setTimeout(() => setNudge(true), 3200);
    return () => clearTimeout(t);
  }, [variant]);

  return (
    <Screen scroll>
      <motion.div
        className="absolute h-[874px] left-0 top-0 w-[402px]"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A("home-bg.png")} />
      </motion.div>
      <StatusBar />
      <HomeHeader />
      <div className="flex items-start justify-center px-[16px] py-[40px] relative shrink-0 w-full">
        <div className="flex flex-[1_0_0] flex-col gap-[12px] items-center justify-center min-w-px relative">
          {variant === "after" ? (
            <>
              <TodayTimeline />
              <WidgetAfterNap />
            </>
          ) : (
            <>
              <AnimatePresence initial={false}>{nudge && <Nudge key="nudge" onDismiss={() => setNudge(false)} />}</AnimatePresence>
              <motion.div layout {...rise(7)} className="w-full">
                <RestPodWidget />
              </motion.div>
            </>
          )}
          <motion.div layout transition={{ duration: 0.6, ease }} className="w-full">
            <Metrics />
          </motion.div>
          <motion.div layout transition={{ duration: 0.6, ease }} className="w-full">
            <HrvCard />
          </motion.div>
        </div>
      </div>
      <TabBar active="home" home={variant === "after" ? "20" : "06"} />
    </Screen>
  );
}

export const S06 = () => <Home variant="widget" />;
export const S07 = () => <Home variant="nudge" />;
export const S20 = () => <Home variant="after" />;

/* ------------------------------ 08 Rest Pod home ------------------------------ */

const BARS = [39.6, 0, 30.8, 41.8, 0];

export function S08() {
  const { go, back } = useNav();
  return (
    <Screen>
      <TopGlows id="s08" />
      <StatusBar />
      <div className="flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px overflow-clip pt-[8px] px-[24px] relative w-full font-text">
        <div className="flex h-[44px] items-center justify-between relative shrink-0 w-full">
          <IconButton src={A("back.svg")} onClick={back} />
          <p className="leading-[normal] text-[16px] text-white whitespace-nowrap">Rest Pod</p>
          <div className="relative shrink-0 size-[24px]" />
        </div>
        <motion.div {...rise(0)} className="flex gap-[8px] items-center leading-[normal] text-[13px] w-full whitespace-nowrap">
          <p className="text-[rgba(255,255,255,0.5)]">Questura di Milano</p>
          <p className="text-[rgba(255,255,255,0.25)]">|</p>
          <p className="text-[rgba(255,255,255,0.5)]">3 pods</p>
        </motion.div>
        <motion.div {...rise(1)} className={`${card} gap-[14px]`}>
          <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.5)] tracking-[1.32px] w-full">BEST TIME TODAY</p>
          <div className="flex gap-[10px] items-end relative shrink-0 w-full whitespace-nowrap">
            <p className="font-num font-light leading-none text-[56px] text-white">1:10</p>
            <p className="font-num font-normal leading-[normal] text-[20px] text-[rgba(255,255,255,0.6)]">PM</p>
          </div>
          <p className="leading-[1.4] text-[14px] text-[rgba(255,255,255,0.55)] w-full">Inside your nap window and free in your calendar.</p>
          <div className="flex gap-[8px] items-center relative shrink-0 w-full">
            <Pill label="Book 1:10 PM" h={48} onClick={() => go("10")} />
            <Pill label="Other times" variant="ghost" h={48} onClick={() => go("09")} />
          </div>
        </motion.div>
        <motion.div
          {...rise(2)}
          className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex gap-[12px] items-center overflow-clip px-[20px] py-[14px] relative rounded-[24px] shrink-0 w-full"
        >
          <div className="relative rounded-[12px] shrink-0 size-[44px] overflow-hidden">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={A("pod-thumb.png")} />
          </div>
          <div className="flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px">
            <div className="flex gap-[6px] items-center">
              <StatusDot />
              <p className="leading-[normal] text-[15px] text-white whitespace-nowrap">Free right now</p>
            </div>
            <p className="leading-[normal] text-[13px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Pod 2F-B, 2nd floor</p>
          </div>
          <Pill label="Nap now" flex={false} onClick={() => go("13")} />
        </motion.div>
        <motion.button {...rise(3)} whileTap={{ scale: 0.98 }} onClick={() => go("19")} className={`${card} gap-[14px] text-left group`}>
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <p className="leading-[normal] text-[11px] text-[rgba(255,255,255,0.5)] tracking-[1.32px] whitespace-nowrap">YOUR REST THIS WEEK</p>
            <div className="transition-transform group-hover:translate-x-[3px]">
              <Img src="chevron-18.svg" size={18} />
            </div>
          </div>
          <div className="flex gap-[10px] items-end relative shrink-0 w-full whitespace-nowrap">
            <p className="font-num font-light leading-none text-[40px] text-white">3</p>
            <p className="leading-[normal] text-[14px] text-[rgba(255,255,255,0.55)]">naps, avg 17 min asleep</p>
          </div>
          <div className="flex items-end justify-between relative shrink-0 w-full">
            {BARS.map((h, k) => (
              <div key={k} className="flex flex-col gap-[6px] items-center relative shrink-0">
                <motion.div
                  className={`${h ? "grad-y" : "bg-[rgba(255,255,255,0.08)]"} rounded-[6px] shrink-0 w-[36px] origin-bottom`}
                  style={{ height: h || 6 }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ ...softSpring, delay: 0.5 + k * 0.07 }}
                />
                <p className="font-num font-normal leading-[normal] text-[12px] text-[rgba(255,255,255,0.45)] whitespace-nowrap">{"MTWTF"[k]}</p>
              </div>
            ))}
          </div>
        </motion.button>
      </div>
      <TabBar active="pod" />
    </Screen>
  );
}
