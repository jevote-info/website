import { FC, useState } from 'react';
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  Image,
  Link,
  useColorModeValue,
  CloseButton,
} from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import NextLink from 'next/link';
import usePrimaryColorModeValue from '../hooks/usePrimaryColorModeValue';

const MainLayout: FC = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const mobileMenuColor = useColorModeValue('white', 'gray.800');
  const primaryColor = usePrimaryColorModeValue();
  const isDark = colorMode === 'dark';
  const [display, changeDisplay] = useState('none');

  return (
    <Flex direction="column">
      <Flex align="center" justify="space-between" padding="8px">
        <NextLink href="/" passHref>
          <Link>
            <Image src="/logo.png" alt="logo" w="64px" />
          </Link>
        </NextLink>
        {/* Desktop */}
        <Flex align="center">
          <Flex display={['none', 'none', 'flex', 'flex']}>
            <NextLink href="/categorie" passHref>
              <Button as="a" colorScheme="primary" variant="ghost" aria-label="Questionnaire">
                Questionnaire
              </Button>
            </NextLink>

            <NextLink href="/equipe" passHref>
              <Button as="a" colorScheme="primary" variant="ghost" aria-label="L'équipe">
                L'équipe
              </Button>
            </NextLink>

            <NextLink href="https://www.instagram.com/" passHref>
              <Button
                as="a"
                colorScheme="primary"
                variant="ghost"
                aria-label="Instagram"
                target="_blank"
              >
                <FontAwesomeIcon width={16} icon={faInstagram} />
              </Button>
            </NextLink>

            <NextLink href="https://www.facebook.com/" passHref>
              <Button
                as="a"
                colorScheme="primary"
                variant="ghost"
                aria-label="Facebook"
                target="_blank"
              >
                <FontAwesomeIcon width={16} icon={faFacebook} />
              </Button>
            </NextLink>

            <NextLink href="https://twitter.com/" passHref>
              <Button
                as="a"
                colorScheme="primary"
                variant="ghost"
                aria-label="Twitter"
                target="_blank"
              >
                <FontAwesomeIcon width={16} icon={faTwitter} />
              </Button>
            </NextLink>
          </Flex>

          {/* Mobile */}
          <IconButton
            aria-label="Open Menu"
            size="lg"
            mr={2}
            icon={<HamburgerIcon />}
            onClick={() => changeDisplay('flex')}
            display={['flex', 'flex', 'none', 'none']}
            colorScheme="primary"
          />
          <Flex align="center" marginLeft="8px">
            <SunIcon color={primaryColor} marginRight="8px" />
            <Switch colorScheme="primary" isChecked={isDark} onChange={toggleColorMode} />
            <MoonIcon color={primaryColor} marginLeft="8px" />
          </Flex>
        </Flex>
      </Flex>

      {/* Mobile Content */}
      <Flex
        w="100vw"
        display={display}
        bgColor={mobileMenuColor}
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
      >
        <Flex justify="flex-end">
          <CloseButton mt={2} mr={2} onClick={() => changeDisplay('none')} />
        </Flex>

        <Flex flexDir="column" align="center">
          <NextLink href="/categorie" passHref>
            <Button
              as="a"
              colorScheme="primary"
              variant="ghost"
              aria-label="Questionnaire"
              marginY="2px"
              width="100%"
            >
              Questionnaire
            </Button>
          </NextLink>

          <NextLink href="/equipe" passHref>
            <Button
              as="a"
              colorScheme="primary"
              variant="ghost"
              aria-label="L'équipe"
              marginY="2px"
              width="100%"
            >
              L'équipe
            </Button>
          </NextLink>

          <NextLink href="https://www.instagram.com/" passHref>
            <Button
              as="a"
              colorScheme="primary"
              variant="ghost"
              aria-label="Instagram"
              target="_blank"
              marginY="2px"
              width="100%"
            >
              <FontAwesomeIcon width={16} icon={faInstagram} />
            </Button>
          </NextLink>

          <NextLink href="https://www.facebook.com/" passHref>
            <Button
              as="a"
              colorScheme="primary"
              variant="ghost"
              aria-label="Facebook"
              target="_blank"
              marginY="2px"
              width="100%"
            >
              <FontAwesomeIcon width={16} icon={faFacebook} />
            </Button>
          </NextLink>

          <NextLink href="https://twitter.com/" passHref>
            <Button
              as="a"
              colorScheme="primary"
              variant="ghost"
              aria-label="Twitter"
              target="_blank"
              marginY="2px"
              width="100%"
            >
              <FontAwesomeIcon width={16} icon={faTwitter} />
            </Button>
          </NextLink>
        </Flex>
      </Flex>
      {children}
    </Flex>
  );
};

export default MainLayout;
