import {
  Text,
  Image,
  VStack,
  HStack,
  Box,
  Flex,
  useBreakpointValue,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { ReactElement, useEffect, useRef } from 'react';
import Survey from '../../types/survey';
import Link from 'next/link';
import { CategoryItem } from './CategoryItem';
import { useRouter } from 'next/router';

interface SurveyLayoutProps {
  survey: Survey;
  currentCategory: Survey[number];
  children: ReactElement;
}

export function SurveyLayoutDesktop(props: SurveyLayoutProps) {
  const { survey, currentCategory, children } = props;

  return (
    <HStack alignItems="start">
      <VStack p={5} alignItems="start" spacing={3}>
        {survey.map(category => (
          <CategoryItem category={category} isActive={category.id === currentCategory.id} />
        ))}
      </VStack>
      <Flex flexDirection="column" flex={1} alignItems="center" p={5}>
        {children}
      </Flex>
    </HStack>
  );
}

function SurveyLayoutMobile(props: SurveyLayoutProps) {
  const { survey, currentCategory, children } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { asPath } = useRouter();

  const buttonRef = useRef(null);

  useEffect(() => {
    onClose();
  }, [asPath]);

  return (
    <>
      <Flex flexDirection="column" alignItems="center" p={3}>
        <Button
          ref={buttonRef}
          p={3}
          mb={3}
          variant="ghost"
          flexDirection="column"
          width="fit-content"
          height="fit-content"
          bgColor="transparent"
          onClick={onOpen}
        >
          <Image src={currentCategory.image} alt={currentCategory.title} height="70px" mb={3} />
          <Text fontSize="2xl" fontWeight="semibold">
            {currentCategory.title}
          </Text>
        </Button>
        {children}
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={buttonRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Catégories</DrawerHeader>

          <DrawerBody>
            <VStack alignItems="start" spacing={3}>
              {survey.map(category => (
                <CategoryItem category={category} isActive={category.id === currentCategory.id} />
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function SurveyLayout(props: SurveyLayoutProps) {
  const variant = useBreakpointValue({ base: 'mobile', lg: 'desktop' });

  return variant === 'desktop' ? (
    <SurveyLayoutDesktop {...props} />
  ) : (
    <SurveyLayoutMobile {...props} />
  );
}

export default SurveyLayout;
