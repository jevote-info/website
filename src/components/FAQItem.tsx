import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  Text,
} from '@chakra-ui/react';
import React, { FC } from 'react';

type FAQItemProps = {
  title: string;
};

const FAQItem: FC<FAQItemProps> = ({ title, children }) => {
  return (
    <AccordionItem>
      <Heading as="h4">
        <AccordionButton py={5}>
          <Text flex="1" textAlign="left" fontWeight="600" fontSize="24px">
            {title}
          </Text>
          <AccordionIcon fontSize={30} />
        </AccordionButton>
      </Heading>
      <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>
  );
};

export default FAQItem;
