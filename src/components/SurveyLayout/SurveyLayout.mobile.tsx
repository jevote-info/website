import {
  Text,
  Image,
  VStack,
  Flex,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Link,
  DrawerFooter,
  Box,
} from '@chakra-ui/react';
import { ReactNode, useEffect, useRef } from 'react';
import Survey from '../../types/survey';
import { CategoryItem } from './CategoryItem';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { MenuLinks } from '../MenuLinks';
import { ColorModeSwitch } from '../ColorModeSwitch';
import Category from '../../types/category';
import Question from '../../types/question';

interface SurveyLayoutProps {
  survey: Survey;
  currentCategory: Category;
  currentQuestion: Question;
  children: ReactNode;
}

export function SurveyLayoutMobile(props: SurveyLayoutProps) {
  const { survey, currentCategory, children } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { asPath } = useRouter();

  const buttonRef = useRef(null);

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

          <DrawerBody>
            <VStack alignItems="start" spacing={3}>
              {survey.map(category => (
                <CategoryItem
                  key={category.id}
                  category={category}
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
