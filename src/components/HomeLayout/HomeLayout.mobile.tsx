import { ReactNode, useEffect, useRef } from 'react';
import {
  Flex,
  IconButton,
  Link,
  VStack,
  Grid,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { MenuLinks } from '../MenuLinks';
import { ColorModeSwitch } from '../ColorModeSwitch';
import { Logo } from '../Logo';

interface HomeLayoutProps {
  surveyPath: string;
  children: ReactNode;
  withColorModeSwitch?: boolean;
}

export function HomeLayoutMobile(props: HomeLayoutProps) {
  const { surveyPath, children, withColorModeSwitch = true } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { asPath } = useRouter();

  const buttonRef = useRef(null);

  useEffect(() => {
    onClose();
  }, [asPath, onClose]);

  return (
    <>
      <VStack height="full">
        <Grid width="full" templateColumns="1fr 1fr 1fr" p={3} alignItems="center">
          <NextLink href="/" passHref>
            <Link _hover={{ textDecoration: 'none' }} height="fit-content">
              <Logo />
            </Link>
          </NextLink>

          <Flex justifyContent="center">
            <IconButton
              ref={buttonRef}
              aria-label="Menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
            />
          </Flex>

          {withColorModeSwitch && (
            <Flex align="center" justifyContent="end">
              <ColorModeSwitch />
            </Flex>
          )}
        </Grid>
        {children}
      </VStack>
      <Drawer isOpen={isOpen} placement="top" onClose={onClose} finalFocusRef={buttonRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <NextLink href="/" passHref>
              <Link _hover={{ textDecoration: 'none' }}>
                <Logo />
              </Link>
            </NextLink>
          </DrawerHeader>

          <DrawerBody>
            <VStack>
              <MenuLinks withSurveyLink surveyPath={surveyPath} withSocialNetworksNames />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
