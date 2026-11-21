import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type ScreenId =
  | "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10"
  | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20";

export type Transition = "push" | "pop" | "fade" | "rise";

export type AppState = {
  wake: number; // minutes from midnight
  feeling: number;
  slot: number; // index in the booking timeline
  day: number;
  pod: string;
  temp: number;
  wakeMode: string;
  smartWake: boolean;
  routineSet: boolean;
  bookedTomorrow: boolean;
};

const initial: AppState = {
  wake: 7 * 60,
  feeling: 4,
  slot: 1,
  day: 0,
  pod: "Any pod",
  temp: -3,
  wakeMode: "Both",
  smartWake: true,
  routineSet: false,
  bookedTomorrow: false,
};

type Nav = {
  screen: ScreenId;
  transition: Transition;
  go: (id: ScreenId, t?: Transition) => void;
  back: () => void;
  jump: (id: ScreenId) => void;
  state: AppState;
  set: (patch: Partial<AppState>) => void;
};

const Ctx = createContext<Nav | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<ScreenId[]>(["01"]);
  const [transition, setTransition] = useState<Transition>("fade");
  const [state, setState] = useState<AppState>(initial);

  const go = useCallback((id: ScreenId, t: Transition = "push") => {
    setTransition(t);
    setStack((s) => [...s, id]);
  }, []);

  const back = useCallback(() => {
    setTransition("pop");
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  const jump = useCallback((id: ScreenId) => {
    setTransition("fade");
    setStack([id]);
  }, []);

  const set = useCallback((patch: Partial<AppState>) => setState((s) => ({ ...s, ...patch })), []);

  const value = useMemo(
    () => ({ screen: stack[stack.length - 1], transition, go, back, jump, state, set }),
    [stack, transition, go, back, jump, state, set],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useNav() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useNav outside provider");
  return v;
}

export const fmt = (mins: number) => {
  const m = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60) % 12 || 12;
  return `${h}:${String(m % 60).padStart(2, "0")}`;
};
export const ampm = (mins: number) => ((((mins % 1440) + 1440) % 1440) < 720 ? "AM" : "PM");

export const SCREENS: { id: ScreenId; title: string; caption: string }[] = [
  { id: "01", title: "Invite", caption: "Entry point. The admin adds the employee to the company network; the user already has the 8S app, so accepting takes one tap." },
  { id: "02", title: "Onboarding · Rest at work", caption: "What the product is, in one sentence. Sets the expectation for the 30-min session structure." },
  { id: "03", title: "Onboarding · Timing", caption: "Science from the brief, made tangible: nap window + 10–20 min sweet spot. Home Pod owners learn their data syncs." },
  { id: "04", title: "Personalize · Wake time", caption: "Shown only to users without a home Pod (Pod owners: wake time comes from night data). Live preview shows the payoff." },
  { id: "05", title: "Personalize · Calendar", caption: "Permission priming with a concrete preview. Busy/free only: blocks read “Busy”, which shows the privacy promise instead of just stating it." },
  { id: "06", title: "Home, Rest Pod widget", caption: "Evolves the WIP “Nap mode” card already on the 8S homepage into the Rest Pod entry point. Glanceable state (free pods, your window) plus two direct actions." },
  { id: "07", title: "Home, proactive nudge", caption: "Same slot, different state. Appears when last night was short or the nap window opens. Uses home Pod sleep data plus calendar to offer one concrete slot." },
  { id: "08", title: "Rest Pod home", caption: "One recommended slot first (window + calendar + free pod), “Nap now” when a pod is free this minute, and a light weekly summary that leads into Track." },
  { id: "09", title: "Book a nap", caption: "Company-wide schedule in one list. Gradient line marks the personal nap window, the best slot is pre-selected, late slots get a soft warning." },
  { id: "10", title: "Customize", caption: "One screen, smart defaults. Wake-up is silent by design (vibration and thermal), smart wake keeps real sleep under 20 min." },
  { id: "11", title: "Booked", caption: "Confirmation plus the two automations that make rest visible and protected: a calendar block and a Slack status." },
  { id: "12", title: "Pre-nap reminder", caption: "Sent 10 min before. The pod pre-cools while you walk over. If nobody checks in within 5 min of the start, the slot is released." },
  { id: "13", title: "Check-in", caption: "QR stays as the physical “I’m here”: one scan confirms presence, starts the session and loads personal settings." },
  { id: "14", title: "Live Activity", caption: "During the nap the phone stays locked. The Live Activity shows the only thing that matters: when you’ll be woken up." },
  { id: "15", title: "During nap", caption: "What you see if you unlock mid-nap: dark, low-contrast, nothing to read. Wake-up time, current phase, and one control." },
  { id: "16", title: "End, didn’t fall asleep", caption: "Never framed as a failure: show what rest did do. Extension is offered only when settling in took most of the session." },
  { id: "17", title: "Wake, how do you feel", caption: "First screen after the vibration and thermal wake-up. One tap on the scale opens the insight." },
  { id: "18", title: "Post-nap insight", caption: "Answers “was it worth it?” in plain words, then links the nap to tonight and to the Sleep Fitness Score." },
  { id: "19", title: "Track, your rest", caption: "Workplace rest patterns over time. Employer sees only anonymous aggregates." },
  { id: "20", title: "Home after nap", caption: "The Rest Pod widget closes the loop (“Same time tomorrow?”) and the nap appears in today’s timeline next to last night." },
];
