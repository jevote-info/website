import { useState, useEffect, useMemo } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Stack,
  useToast,
  Spinner,
  useColorMode,
} from '@chakra-ui/react';
import axios from 'axios';
import Image from 'next/image';
import { Politician } from '@prisma/client';
import { SharingVariant, ImageSharingVariant } from '../../../types/surveyResult';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { isImageSharingVariant } from '../../../utils/isSharingVariant';
import lightSharingPostImage from './images/light/sharing-post.png';
import lightSharingStoryImage from './images/light/sharing-story.png';
import lightSharingTextImage from './images/light/sharing-text.png';
import darkSharingPostImage from './images/dark/sharing-post.png';
import darkSharingStoryImage from './images/dark/sharing-story.png';
import darkSharingTextImage from './images/dark/sharing-text.png';

interface SharingModalProps {
  open: boolean;
  onClose: () => void;
  politicians: Politician[];
}

type SharingImages = Record<ImageSharingVariant, File>;

const fread = (file: File) => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new Error('Problem parsing file'));
    };

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  });
};

export function SharingDialog(props: SharingModalProps) {
  const { open, politicians, onClose } = props;

  const toast = useToast();
  const isMobile = useIsMobile();
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState<ImageSharingVariant | undefined>();
  const [images, setImages] = useState<SharingImages>();

  const textSharing = useMemo(() => {
    return `Mes résultats

🟦 🥇 ${politicians[0].name}
🟦⬜ 🥈 ${politicians[1].name}
🟦⬜🟥 🥉 ${politicians[2].name}

https://jevote.info`;
  }, [politicians]);

  useEffect(() => {
    async function preloadImages() {
      const imageGenerations = ['post', 'story'].map(sharingVariant =>
        axios.post(
          'api/generateSharingImage',
          {
            sharingVariant,
            politicians,
          },
          { responseType: 'blob' },
        ),
      );

      const [postResponse, storyResponse] = await Promise.all(imageGenerations);

      const images = {
        post: new File([postResponse.data], `Mes résultats jevote.info.png`, {
          type: 'image/png',
          lastModified: Date.now(),
        }),
        story: new File([storyResponse.data], `Mes résultats jevote.info.png`, {
          type: 'image/png',
          lastModified: Date.now(),
        }),
      };
      setImages(images);
    }

    preloadImages();
  }, [politicians]);

  const navigatorShareEnabled = useMemo(() => {
    return !!navigator.share;
  }, []);

  const share = async (sharingVariant: SharingVariant) => {
    if (sharingVariant === 'text' && textSharing) {
      navigator.clipboard.writeText(textSharing);
      toast({
        title: 'Copié !',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
    } else {
      if (!images || !isImageSharingVariant(sharingVariant)) return;
      setLoading(sharingVariant);

      try {
        if (navigatorShareEnabled && navigator.canShare({ files: [images[sharingVariant]] })) {
          await navigator.share({ files: [images[sharingVariant]] });
          setLoading(undefined);
        } else {
          const dataURL = (await fread(images[sharingVariant])) as string;

          const link = document.createElement('a');
          link.href = dataURL;
          link.download = `Mes résultats jevote.info.png`;
          link.click();
          setLoading(undefined);
        }
      } catch (err) {
        console.error('Could not generate sharing image', err);
        setLoading(undefined);
      }
    }
  };

  return (
    <Modal isOpen={open} onClose={onClose} size={isMobile ? 'full' : 'lg'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Partager mes résultats</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack width="full" height="full" direction={['column', 'column', 'row']}>
            <Button
              flexDirection="column"
              onClick={() => share('text')}
              bgColor="grey.300"
              borderColor="grey.300"
              borderWidth="3px"
              borderRadius="10px"
              minHeight="260px"
              padding="3"
              flex="1"
            >
              <Image
                width={100}
                height={200}
                src={colorMode === 'dark' ? darkSharingTextImage : lightSharingTextImage}
              />
              <Text mt="3">Texte</Text>
            </Button>
            <Button
              flexDirection="column"
              onClick={() => share('story')}
              bgColor="grey.300"
              borderColor="grey.300"
              borderWidth="3px"
              borderRadius="10px"
              minHeight="260px"
              padding="3"
              flex="1"
            >
              {loading === 'story' ? (
                <Spinner />
              ) : (
                <>
                  <Image
                    width={100}
                    height={200}
                    src={colorMode === 'dark' ? darkSharingStoryImage : lightSharingStoryImage}
                  />
                  <Text mt="3">Story</Text>
                </>
              )}
            </Button>
            <Button
              flexDirection="column"
              onClick={() => share('post')}
              bgColor="grey.300"
              borderColor="grey.300"
              borderWidth="3px"
              borderRadius="10px"
              minHeight="260px"
              padding="3"
              flex="1"
            >
              {loading === 'post' ? (
                <Spinner />
              ) : (
                <>
                  <Image
                    width={100}
                    height={200}
                    src={colorMode === 'dark' ? darkSharingPostImage : lightSharingPostImage}
                  />
                  <Text mt="3">Post</Text>
                </>
              )}
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
