import { Box, Image } from '@chakra-ui/react';
import { motion, useViewportScroll, useMotionValue } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

const AnimatedEnvelop = () => {
  const { scrollY: viewportScrollY } = useViewportScroll();
  const scrollY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialScrollPositionRef = useRef<number | null>(null);

  useEffect(() => {
    if (initialScrollPositionRef.current === null) {
      initialScrollPositionRef.current = scrollY.get();
    }

    const unsubscribe = viewportScrollY.onChange(value => {
      const rect = containerRef.current?.getBoundingClientRect();

      if (rect) {
        const top = rect.top + window.scrollY;
        const height = rect.height;
        const windowHeight = window.innerHeight;
        const bottomY = windowHeight + value;
        const minimumScrollY = top + height + 32;

        if (bottomY > minimumScrollY && bottomY - minimumScrollY < height - height / 3) {
          scrollY.set(bottomY - minimumScrollY);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      width="100%"
      overflow="hidden"
      position="relative"
      display="flex"
      justifyContent="center"
    >
      <motion.div style={{ y: scrollY }}>
        <Image alt="Bulletin de vote" src="/envelop.png" maxH="400px" />
      </motion.div>
      <Box
        position="absolute"
        bottom="0"
        height="4px"
        width="100%"
        background="rgba(0, 0, 0, 0.08)"
        opacity="0.48"
        box-shadow="0px 16px 88px rgba(0, 0, 0, 0.04)"
      />
      <Box
        position="absolute"
        bottom="0"
        height="4px"
        width="60%"
        background="rgba(0, 0, 0, 0.16)"
        opacity="0.48"
        box-shadow="0px 16px 88px rgba(0, 0, 0, 0.04)"
      />
    </Box>
  );
};

export default AnimatedEnvelop;
