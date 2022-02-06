import { Avatar, Box, Progress, ProgressLabel, Text, WrapItem } from '@chakra-ui/react';
import { Politician } from '@prisma/client';

interface PoliticianGlobalScoreProps {
  politician: Politician;
  score: number;
}

export function PoliticianGlobalScore(props: PoliticianGlobalScoreProps) {
  const { politician, score } = props;

  return (
    <Box width="100%">
      <WrapItem padding={2} alignItems="center">
        <Avatar name={politician.name} src={politician.pictureUrl} />
        <Text marginLeft={2} fontWeight="bold">
          {politician.name}
        </Text>
      </WrapItem>

      {score > 0 && (
        <Progress
          variant="multiSegment"
          height={8}
          min={0}
          max={200}
          values={[
            { color: 'default', value: 100 },
            { color: 'primary.500', value: score },
            { color: 'default', value: 100 - score },
          ]}
        >
          <ProgressLabel>{score}</ProgressLabel>
        </Progress>
      )}
      {score <= 0 && (
        <Progress
          variant="multiSegment"
          height={8}
          min={0}
          max={200}
          values={[
            { color: 'default', value: 100 - Math.abs(score) },
            { color: 'secondary.500', value: Math.abs(score) },
            { color: 'default', value: 100 },
          ]}
        >
          <ProgressLabel>{score}</ProgressLabel>
        </Progress>
      )}
    </Box>
  );
}
