import { Flex, Text, useColorModeValue, useTheme } from '@chakra-ui/react';

interface LogoProps {
  size?: 'medium' | 'small';
}

const sizes = {
  medium: { height: 40 },
  small: { height: 20 },
};

export function Logo(props: LogoProps) {
  const { size = 'medium' } = props;

  const theme = useTheme();
  const primaryStrokeColor = useColorModeValue(
    theme.colors.primary['900'],
    theme.colors.primary['500'],
  );
  const primaryFillColor = useColorModeValue(
    theme.colors.primary['600'],
    theme.colors.primary['200'],
  );

  return (
    <Flex alignItems="center">
      <svg
        height={sizes[size].height}
        viewBox="0 0 127 99"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect opacity="0.16" x="25" y="37" width="76" height="49" rx="2" fill={primaryFillColor} />
        <path d="M4 95H123" stroke={primaryStrokeColor} strokeWidth="8" strokeLinecap="round" />
        <path
          d="M112 95L111.53 33.4695C111.514 31.2723 109.728 29.5 107.53 29.5H101"
          stroke={primaryStrokeColor}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M15 95L14.5308 33.5305C14.5138 31.3095 16.3096 29.5 18.5307 29.5H26"
          stroke={primaryStrokeColor}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M81.5 4H45.5C43.2909 4 41.5 5.79086 41.5 8V49C41.5 51.2091 43.2909 53 45.5 53H69.8431C70.904 53 71.9214 52.5786 72.6716 51.8284L84.3284 40.1716C85.0786 39.4214 85.5 38.404 85.5 37.3431V8C85.5 5.79086 83.7091 4 81.5 4Z"
          fill={theme.colors.secondary['500']}
          stroke={primaryStrokeColor}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M53 28.5L57.9991 34.2682C58.793 35.1842 60.2126 35.1891 61.0128 34.2785L74 19.5"
          stroke={primaryStrokeColor}
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
      <Text marginLeft="16px" fontSize="16px" fontWeight="900" color={primaryStrokeColor}>
        je
        <Text as="span" color={theme.colors.secondary['500']}>
          vote
        </Text>
        .info
      </Text>
    </Flex>
  );
}
