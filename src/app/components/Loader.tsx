import { motion } from "motion/react";

export function Loader() {
  return (
    <div className="fixed inset-0 bg-[#F5F5F5] flex items-center justify-center z-50">
      <div className="relative w-[200px] h-[210px]">
        {/* Red Circle with Pulse Animation */}
        <motion.div
          className="absolute top-0 right-8"
          animate={{
            opacity: [1, 0.4, 1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="90" height="90" viewBox="0 0 180 180">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle 
              cx="90" 
              cy="90" 
              r="45" 
              fill="#E63946" 
              filter="url(#glow)"
            />
          </svg>
        </motion.div>

        {/* Smile Path - Static (No Animation) */}
        <svg
          width="200"
          height="210"
          viewBox="0 0 603 632"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0"
        >
          <path
            d="M111.54 335.951L167.887 335.951C167.755 336.802 167.63 337.655 167.512 338.509C164.853 357.818 165.975 377.213 170.74 395.519C175.503 413.82 183.8 430.637 195.035 445.014C206.268 459.387 220.238 471.065 236.089 479.401C251.938 487.736 269.422 492.6 287.522 493.673C305.628 494.747 324.04 492.006 341.649 485.516C359.262 479.024 375.702 468.919 389.925 455.729C404.149 442.536 415.821 426.568 424.198 408.786L474.732 432.591C463.335 456.785 447.422 478.588 427.911 496.684C408.397 514.782 385.642 528.835 360.964 537.931C336.282 547.027 310.177 550.974 284.216 549.435C258.248 547.894 233.019 540.9 210.087 528.84C187.155 516.78 167.067 499.949 151.019 479.414C134.974 458.883 123.327 435.11 116.684 409.586C110.466 385.695 108.75 360.712 111.54 335.951Z"
            fill="#1A1A1A"
          />
        </svg>

        {/* Loading Text */}
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[14px] font-semibold text-[#757575]">
            Loading
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ...
            </motion.span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}