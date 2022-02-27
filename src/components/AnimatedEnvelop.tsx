import { Box, Image, useColorModeValue } from '@chakra-ui/react';
import { motion, useViewportScroll, useMotionValue } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

const AnimatedEnvelop = () => {
  const { scrollY } = useViewportScroll();
  const y = useMotionValue(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const envelopRef = useRef<HTMLDivElement>(null);

  const flagColorsOpacity = useColorModeValue(0.4, 0.7);

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
    <Box position="relative" width="100%">
      <Box
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        background={`radial-gradient(20.63% 46.62% at 30% 50%, rgba(57, 63, 255, ${flagColorsOpacity}) 0%, rgba(255, 255, 255, 0) 100%)`}
        opacity="0.24"
      />
      <Box
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        background={`radial-gradient(20.63% 46.62% at 70% 50%, rgba(255, 17, 17, ${flagColorsOpacity}) 0%, rgba(255, 255, 255, 0) 100%)`}
        opacity="0.24"
      />
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
          width={envelopRef.current ? envelopRef.current.getBoundingClientRect().width : '90%'}
          background="rgba(0, 0, 0, 0.16)"
          opacity="0.48"
          box-shadow="0px 16px 88px rgba(0, 0, 0, 0.04)"
        />
      </Box>
    </Box>
  );
};

export default AnimatedEnvelop;
