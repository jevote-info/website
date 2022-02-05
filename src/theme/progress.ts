import { ChakraTheme } from '@chakra-ui/react';
import { getColor, mode } from '@chakra-ui/theme-tools';

// inspired by https://codesandbox.io/s/chakra-ui-theme-extension-w5u2n?file=/src/sections/ProgressSection.js

const multiSegmentFilledTrack = (props: {
  theme: ChakraTheme;
  values: { color: string; value: number }[];
  max: number;
}) => {
  const { theme, values, max } = props;

  const breakpoints = [];
  let totalPct = 0;
  const trackColor = getColor(theme, mode('gray.100', 'gray.600')(props));

  for (const { color, value } of values) {
    const fillColor = color === 'default' ? trackColor : getColor(theme, mode(color, color)(props));
    let pct = +Number.parseFloat(`${(value / max) * 100}`).toFixed(1);

    breakpoints.push(`${fillColor} ${totalPct}%`);

    totalPct += pct;
    if (totalPct > max) {
      totalPct = max;
    }

    breakpoints.push(`${fillColor} ${totalPct}%`);
  }

  if (totalPct < max) {
    breakpoints.push(`${trackColor} ${totalPct}%`);
    breakpoints.push(`${trackColor} 100%`);
  }

  console.log(breakpoints);

  const gradient = `
    linear-gradient(
    to right,
    ${breakpoints.join(', ')}
  )`;

  // Need to override the width specified by style
  return {
    minWidth: '100%',
    bgImage: gradient,
  };
};

export const ProgressTheme = {
  components: {
    Progress: {
      variants: {
        multiSegment: (props: {
          theme: ChakraTheme;
          values: { color: string; value: number }[];
          max: number;
        }) => ({
          filledTrack: multiSegmentFilledTrack(props),
        }),
      },
    },
  },
};
