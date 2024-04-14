"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <div className="flex- h-screen w-full">
      <div
        ref={ref}
        style={{
          //   transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,

          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
        className="flex delay-200"
      >
        <img src="https://i.ibb.co/jJw3Jr1/wip.jpg" alt="wip" />
      </div>
    </div>
  );
}

export default Process;
