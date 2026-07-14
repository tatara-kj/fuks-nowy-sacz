"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";

export type BookingCategory =
  | "A"
  | "B"
  | "B+E"
  | "C"
  | "C+E"
  | "D"
  | "T"
  | "Kwalifikacje";

interface BookingButtonProps
  extends Omit<HTMLMotionProps<"button">, "children" | "onClick"> {
  category?: BookingCategory;
  children?: ReactNode;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  showIcon?: boolean;
}

export function BookingButton({
  category,
  children = "Zarezerwuj termin",
  className = "",
  onClick,
  showIcon = true,
  type = "button",
  ...props
}: BookingButtonProps) {
  const reduceMotion = useReducedMotion();

  function openBooking(event: ReactMouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (event.defaultPrevented) return;

    window.dispatchEvent(
      new CustomEvent("fuks:open-booking", {
        detail: { category },
      }),
    );
  }

  return (
    <motion.button
      type={type}
      onClick={openBooking}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#c8ff33] px-5 py-3 text-sm font-black tracking-[-0.01em] text-[#111310] shadow-[0_12px_32px_rgba(200,255,51,0.18)] transition-[background-color,box-shadow,color] duration-300 hover:bg-[#d5ff66] hover:shadow-[0_16px_38px_rgba(200,255,51,0.26)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff33] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showIcon ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          strokeWidth={2.5}
        />
      ) : null}
    </motion.button>
  );
}
