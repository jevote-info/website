import { useRadioGroup } from '@chakra-ui/react';
import React from 'react';
import { useController, Control } from 'react-hook-form';
import { QuestionAnswer } from '../../types/answers';
import { useIsMobile } from '../../hooks/useIsMobile';
import { ImportanceMeterMobile } from './ImportanceMeter.mobile';
import { ImportanceMeterDesktop } from './ImportanceMeter.desktop';

interface ImportanceMeterProps {
  control: Control<QuestionAnswer>;
}

export function ImportanceMeter(props: ImportanceMeterProps) {
  const { control } = props;

  const isMobile = useIsMobile();

  const {
    field: { onChange, name, value },
  } = useController({
    name: `weight`,
    control,
  });

  const radioGroup = useRadioGroup({
    value: `${value}`,
    name,
    onChange: value => onChange(+value),
  });

  return isMobile ? (
    <ImportanceMeterMobile radioGroup={radioGroup} />
  ) : (
    <ImportanceMeterDesktop radioGroup={radioGroup} />
  );
}
