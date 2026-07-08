'use client';

import React from 'react';
import { PlusIcon } from '@phosphor-icons/react';

import { ContentCard } from '@/components/ContentCard';
import { CustomButton } from '@/components/CustomButton';
import { SectionHeader } from '@/components/SectionHeader';
import { useSeasons } from './hooks/useSeasons';

const SeasonsView = () => {

  const { data: seasons, isLoading } = useSeasons();

  

  return (
    <>
      <SectionHeader
        title="Temporadas"
        subtitle="Cada temporada agrupa un ciclo deportivo con su saldo inicial."
        actions={
          <>
            <CustomButton variant="contained" icon={<PlusIcon />}>
              Nueva temporada
            </CustomButton>
          </>
        }
      />
      <ContentCard>
        <h1>Hola mundo desde cards</h1>
      </ContentCard>
    </>
  );
};

export default SeasonsView;
