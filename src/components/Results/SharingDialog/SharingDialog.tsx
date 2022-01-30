import { useState, useEffect, useMemo } from 'react';
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  HStack,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';
import { Politician } from '@prisma/client';
import { SharingVariant, ImageSharingVariant } from '../../../types/surveyResult';
import { useIsMobile } from '../../../hooks/useIsMobile';

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

const isImageSharingVariant = (
  sharingVariant: SharingVariant,
): sharingVariant is ImageSharingVariant => {
  return sharingVariant !== 'text';
};

export function SharingDialog(props: SharingModalProps) {
  const { open, politicians, onClose } = props;

  const toast = useToast();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      if (!images || !isImageSharingVariant(sharingVariant)) return;

      try {
        if (navigatorShareEnabled && navigator.canShare({ files: [images[sharingVariant]] })) {
          await navigator.share({ files: [images[sharingVariant]] });
          setLoading(false);
        } else {
          const dataURL = (await fread(images[sharingVariant])) as string;

          const link = document.createElement('a');
          link.href = dataURL;
          link.download = `Mes résultats jevote.info.png`;
          link.click();
          setLoading(false);
        }
      } catch (err) {
        console.error('Could not generate sharing image', err);
        setLoading(false);
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
          <HStack width="full" height="full">
            <Button
              onClick={() => share('text')}
              bgColor="grey.300"
              borderColor="grey.300"
              borderWidth="3px"
              borderRadius="10px"
              minHeight="150px"
              padding="3"
              flex="1"
            >
              <Text>Text</Text>
            </Button>
            <Button
              onClick={() => share('story')}
              bgColor="grey.300"
              borderColor="grey.300"
              borderWidth="3px"
              borderRadius="10px"
              minHeight="150px"
              padding="3"
              flex="1"
            >
              <Text>Story</Text>
            </Button>
            <Button
              onClick={() => share('post')}
              bgColor="grey.300"
              borderColor="grey.300"
              borderWidth="3px"
              borderRadius="10px"
              minHeight="150px"
              padding="3"
              flex="1"
            >
              <Text>Post</Text>
            </Button>
          </HStack>
          <Center>{loading && <Spinner color="primary.200" />}</Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
