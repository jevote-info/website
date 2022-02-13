import { Box, Image } from '@chakra-ui/react';
import { motion, useViewportScroll, useMotionValue } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

const AnimatedEnvelop = () => {
  const { scrollY } = useViewportScroll();
  const y = useMotionValue(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const envelopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setY = (currentScroll: number) => {
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (containerRect) {
        const containerY = containerRect.top + window.scrollY;
        const containerHeight = containerRect.height;
        const containerBottomY = containerY + containerHeight;
        const windowHeight = window.innerHeight;

        const minimumScrollBottomY =
          windowHeight > containerBottomY + 32 ? 0 : containerBottomY - windowHeight + 32;
        const maximumScrollBottomY = minimumScrollBottomY + containerHeight / 2;

        if (currentScroll > minimumScrollBottomY && currentScroll < maximumScrollBottomY) {
          y.set(currentScroll - minimumScrollBottomY);
        }
      }
    };

    const unsubscribe = scrollY.onChange(setY);

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <motion.div style={{ y }} ref={envelopRef}>
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
        width={envelopRef.current?.getBoundingClientRect().width}
        background="rgba(0, 0, 0, 0.16)"
        opacity="0.48"
        box-shadow="0px 16px 88px rgba(0, 0, 0, 0.04)"
      />
    </Box>
  );
};

export default AnimatedEnvelop;
