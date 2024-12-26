"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./Mode_Toggle";

export const Header = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true); // Start with navbar visible

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(true); // Show navbar when at the top
      } else {
        if (direction < 0) {
          setVisible(true); // Show navbar when scrolling up
        } else {
          setVisible(false); // Hide navbar when scrolling down
        }
      }
    }
  });

  return (
    <div className="flex justify-center items-center mb-14">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex w-full fixed top-0 bg-blue-100/20 rounded-b-xl z-10 justify-between md:px-8 items-center p-1.5 px-3 max-w-[768px] backdrop-blur-sm border border-[#3476f4]",
            className
          )}
        >
          {navItems.map((navItem, idx) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span className="text-lg md:text-xl dark:text-white text-[#3476f4] tracking-wide">
                {navItem.name}
              </span>
            </Link>
          ))}
          <div className="flex justify-center items-center space-x-3 sm:space-x-5">
            <Link href={"/create"}>
              <Button className="text-[#3476f4] bg-gray-50 hover:bg-white">
                Add Items
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
