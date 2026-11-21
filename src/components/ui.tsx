import { motion, type HTMLMotionProps } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

export const A = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

/* ---------- motion presets ---------- */

export const spring = { type: "spring", stiffness: 420, damping: 34, mass: 0.8 } as const;
export const softSpring = { type: "spring", stiffness: 180, damping: 26 } as const;
export const ease = [0.22, 1, 0.36, 1] as const;

/** staggered fade-up for screen content; spread onto any motion element */
export const rise = (i = 0, y = 14) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease, delay: 0.08 + i * 0.06 },
});

export const tap = { whileTap: { scale: 0.96 }, transition: spring };

/* ---------- glows (decorative blurred ellipses from the design) ---------- */

type GlowProps = { src: string; box: CSSProperties; inset: string; delay?: number; drift?: number };

export function Glow({ src, box, inset, delay = 0, drift = 18 }: GlowProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={box as any}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: [0, drift, -drift * 0.6, 0], y: [0, drift * 0.5, drift * 0.2, 0], scale: [1, 1.06, 0.98, 1] }}
      transition={{
        opacity: { duration: 1.2, delay },
        default: { duration: 14 + delay * 4, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <div className="absolute" style={{ inset }}>
        <img alt="" className="block max-w-none size-full" src={src} />
      </div>
    </motion.div>
  );
}

/** the standard two-glow header used by most Rest Pod screens */
export function TopGlows({ id, single = false }: { id: string; single?: boolean }) {
  return (
    <>
      <Glow src={A(`${id}-glow.svg`)} box={{ left: -120, top: -260, width: 520, height: 440 }} inset="-25% -21.15%" />
      {!single && (
        <Glow src={A(`${id}-glow1.svg`)} box={{ left: 140, top: -120, width: 360, height: 300 }} inset="-36.67% -30.56%" delay={0.6} drift={-14} />
      )}
    </>
  );
}

/* ---------- chrome ---------- */

export function StatusBar() {
  return (
    <div className="flex h-[54px] items-center justify-between pl-[40px] pr-[32px] pt-[14px] relative shrink-0 w-full z-10">
      <p className="font-inter font-semibold leading-[normal] text-[16px] text-white whitespace-nowrap">9:41</p>
      <div className="h-[13px] relative shrink-0 w-[78px]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={A("indicators.svg")} />
      </div>
    </div>
  );
}

export function HomeIndicator() {
  return (
    <div className="h-[34px] relative shrink-0 w-full">
      <div className="absolute bg-white h-[5px] left-[129.5px] rounded-[3px] top-[21px] w-[134px]" />
    </div>
  );
}

/** root of every screen: 393×852, rounded, dark */
export function Screen({
  children,
  className = "bg-[#060609]",
  style,
  scroll = false,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  scroll?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-start overflow-clip relative rounded-[44px] size-full ${className}`}
      style={style}
    >
      {scroll ? (
        <div className="no-scrollbar absolute inset-0 overflow-y-auto overflow-x-hidden flex flex-col items-start">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}

/* ---------- buttons ---------- */

type BtnProps = Omit<HTMLMotionProps<"button">, "children"> & { label: ReactNode; className?: string };

export function ButtonPrimary({ label, className = "", ...rest }: BtnProps) {
  return (
    <motion.button
      {...tap}
      whileHover={{ scale: 1.01 }}
      className={`bg-white flex h-[56px] items-center justify-center relative rounded-[28px] shrink-0 w-full overflow-hidden ${className}`}
      {...rest}
    >
      <span className="font-text leading-[normal] text-[16px] text-black whitespace-nowrap flex items-center gap-2">{label}</span>
    </motion.button>
  );
}

export function ButtonSecondary({ label, className = "", ...rest }: BtnProps) {
  return (
    <motion.button
      {...tap}
      className={`flex h-[56px] items-center justify-center relative rounded-[28px] shrink-0 w-full group ${className}`}
      {...rest}
    >
      <span className="font-text leading-[normal] text-[16px] text-[rgba(255,255,255,0.6)] whitespace-nowrap transition-colors group-hover:text-white">
        {label}
      </span>
    </motion.button>
  );
}

type PillProps = Omit<HTMLMotionProps<"button">, "children"> & {
  label: ReactNode;
  variant?: "primary" | "ghost";
  h?: number;
  px?: number;
  flex?: boolean;
  textSize?: number;
};

export function Pill({ label, variant = "primary", h = 40, px = 18, flex = true, textSize = 14, className = "", ...rest }: PillProps) {
  const base =
    variant === "primary"
      ? "bg-white text-black"
      : "border border-[rgba(255,255,255,0.2)] border-solid text-white hover:bg-[rgba(255,255,255,0.06)]";
  return (
    <motion.button
      {...tap}
      className={`${base} ${flex ? "flex-[1_0_0] min-w-px" : "shrink-0"} flex items-center justify-center overflow-clip relative transition-colors ${className}`}
      style={{ minHeight: h, paddingInline: px, borderRadius: h / 2 }}
      {...rest}
    >
      <span className="font-text leading-[normal] whitespace-nowrap flex items-center gap-[6px]" style={{ fontSize: textSize }}>
        {label}
      </span>
    </motion.button>
  );
}

export function IconButton({
  src,
  size = 24,
  onClick,
  className = "",
}: {
  src: string;
  size?: number;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.85, x: -2 }}
      transition={spring}
      onClick={onClick}
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={src} />
    </motion.button>
  );
}

/* ---------- toggle (12:141 On / 12:143 Off) ---------- */

export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <motion.button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      whileTap={{ scale: 0.94 }}
      className="h-[31px] relative shrink-0 w-[51px] rounded-[15.5px]"
      animate={{ backgroundColor: on ? "#4073FF" : "rgba(255,255,255,0.16)" }}
      transition={{ duration: 0.25 }}
    >
      <motion.span
        className="absolute top-[2px] size-[27px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
        animate={{ left: on ? 22 : 2 }}
        transition={spring}
      />
    </motion.button>
  );
}

/* ---------- stepper ---------- */

export function Stepper({
  value,
  onChange,
  size = 36,
  icon = 16,
  text = 28,
  minus = "minus.svg",
  plus = "plus.svg",
  min = -10,
  max = 10,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: number;
  icon?: number;
  text?: number;
  minus?: string;
  plus?: string;
  min?: number;
  max?: number;
}) {
  const step = (d: number) => onChange(Math.max(min, Math.min(max, value + d)));
  const Btn = ({ src, d }: { src: string; d: number }) => (
    <motion.button
      whileTap={{ scale: 0.86 }}
      whileHover={{ backgroundColor: "rgba(255,255,255,0.14)" }}
      transition={spring}
      onClick={() => step(d)}
      className="bg-[rgba(255,255,255,0.08)] flex items-center justify-center overflow-clip relative shrink-0"
      style={{ width: size, height: size, borderRadius: size / 2 }}
    >
      <div className="relative shrink-0" style={{ width: icon, height: icon }}>
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={A(src)} />
      </div>
    </motion.button>
  );
  const label = value > 0 ? `+${value}` : `${value}`;
  return (
    <div className="flex gap-[10px] items-center overflow-clip relative shrink-0">
      <Btn src={minus} d={-1} />
      <div className="relative overflow-hidden flex justify-center" style={{ minWidth: text * 0.9 }}>
        <motion.p
          key={value}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25, ease }}
          className="font-num font-light leading-[normal] whitespace-nowrap"
          style={{ fontSize: text, color: value > 0 ? "#f5a37a" : "#80a6ff" }}
        >
          {label}
        </motion.p>
      </div>
      <Btn src={plus} d={1} />
    </div>
  );
}

/* ---------- segmented control with sliding thumb ---------- */

export function Segmented({
  options,
  value,
  onChange,
  id,
  h = 36,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  id: string;
  h?: number;
}) {
  return (
    <div className="bg-[rgba(255,255,255,0.06)] flex gap-[4px] items-center overflow-clip p-[4px] relative rounded-[16px] shrink-0 w-full">
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            onClick={() => onChange(o)}
            className="flex flex-[1_0_0] items-center justify-center min-w-px overflow-clip relative rounded-[12px]"
            style={{ minHeight: h }}
          >
            {active && (
              <motion.div layoutId={`seg-${id}`} className="absolute inset-0 bg-[rgba(255,255,255,0.16)] rounded-[12px]" transition={spring} />
            )}
            <span
              className="font-text leading-[normal] text-[13px] whitespace-nowrap relative transition-colors duration-200"
              style={{ color: active ? "#fff" : "rgba(255,255,255,0.55)" }}
            >
              {o}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- small atoms ---------- */

export function Eyebrow({ children, color = "rgba(255,255,255,0.5)", className = "" }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <p className={`font-text leading-[normal] text-[11px] tracking-[1.32px] ${className}`} style={{ color }}>
      {children}
    </p>
  );
}

export function StatusDot({ size = 8, src = "status-dot.svg" }: { size?: number; src?: string }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full bg-[#59D98C]"
        animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={A(src)} />
    </div>
  );
}

export function Img({ src, size, className = "" }: { src: string; size: number | [number, number]; className?: string }) {
  const [w, h] = Array.isArray(size) ? size : [size, size];
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: w, height: h }}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={A(src)} />
    </div>
  );
}

export function Spinner({ color = "#000" }: { color?: string }) {
  return (
    <motion.span
      className="inline-block size-[18px] rounded-full border-2"
      style={{ borderColor: `${color}33`, borderTopColor: color }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function Check({ color = "#000", size = 18 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <motion.path
        d="M4 9.5L7.5 13L14 5.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 } as any}
        animate={{ pathLength: 1 } as any}
        transition={{ duration: 0.35, ease }}
      />
    </svg>
  );
}
