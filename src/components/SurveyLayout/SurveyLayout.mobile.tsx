import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Link,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useRef } from 'react';
import { useSurveyStore } from '../../stores/survey';
import { Category } from '../../types/category';
import { Survey } from '../../types/survey';
import { ColorModeSwitch } from '../ColorModeSwitch';
import { MenuLinks } from '../MenuLinks';
import { CategoryItem } from './CategoryItem';

interface SurveyLayoutProps {
  survey: Survey;
  currentCategory: Category;
  children: ReactNode;
}

export function SurveyLayoutMobile(props: SurveyLayoutProps) {
  const { survey, currentCategory, children } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { asPath } = useRouter();

  const buttonRef = useRef(null);
  const { answers } = useSurveyStore();

  useEffect(() => {
    onClose();
  }, [asPath, onClose]);

  return (
    <>
      <VStack height="full" px={5}>
        <Flex width="full" py={3}>
          <Flex flex={1} alignItems="start">
            <NextLink href="/" passHref>
              <Link>
                <Image src="/logo.png" alt="logo" w="64px" />
              </Link>
            </NextLink>
          </Flex>

          <Flex justifyContent="center" flex={1}>
            <Button
              ref={buttonRef}
              p={0}
              mb={3}
              flexDirection="column"
              alignItems="center"
              variant="ghost"
              bgColor="transparent"
              onClick={onOpen}
              width={150}
              height="fit-content"
            >
              <Image src={currentCategory.image} alt={currentCategory.title} height="30px" mb={3} />
              <Text fontSize="sm" fontWeight="semibold" whiteSpace="normal">
                {currentCategory.title}
              </Text>
            </Button>
          </Flex>

          <Flex align="start" justifyContent="end" flex={1} pt={3}>
            <ColorModeSwitch />
          </Flex>
        </Flex>
        <Box height="full" position="relative">
          {children}
        </Box>
      </VStack>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={buttonRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Catégories</DrawerHeader>

          <DrawerBody paddingInlineStart={2} paddingInlineEnd={2}>
            <VStack alignItems="start">
              {survey.map(category => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  categoryAnswers={answers[category.id]}
                  isActive={category.id === currentCategory.id}
                />
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <MenuLinks />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
