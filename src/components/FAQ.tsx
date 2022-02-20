import { Accordion, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import FAQItem from './FAQItem';

const FAQ = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <Heading
        as="h3"
        size={isMobile ? '2xl' : '3xl'}
        textAlign="center"
        marginTop="64px"
        marginBottom="64px"
      >
        En savoir plus sur notre{' '}
        <Text as="span" color="primary.600">
          initiative citoyenne :
        </Text>{' '}
      </Heading>
      <Accordion width="100%">
        <FAQItem
          title="Comment fonctionne l'application ?"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <FAQItem
          title="Mes données sont elles stockées ?"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <FAQItem
          title="Comment fonctionne l'algorithme ?"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <FAQItem
          title="Quelles sont les sources utilisées ?"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <FAQItem
          title="Pourquoi nous avons lancé cette initiative ?"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
      </Accordion>
    </>
  );
};

export default FAQ;
