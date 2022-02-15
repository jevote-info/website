import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  Text,
} from '@chakra-ui/react';
import React from 'react';

type FAQItemProps = {
  title: string;
  description: string;
};

const FAQItem = ({ title, description }: FAQItemProps) => {
  return (
    <AccordionItem>
      <Heading as="h4">
        <AccordionButton>
          <Text flex="1" textAlign="left" fontWeight="600" fontSize="24px">
            {title}
          </Text>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel pb={4}>{description}</AccordionPanel>
    </AccordionItem>
  );
};

export default FAQItem;
