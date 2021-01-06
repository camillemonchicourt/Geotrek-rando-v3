import React from 'react';
import styled from 'styled-components';

import { Chip } from 'components/Chip';

import { borderRadius, colorPalette, getSpacing, typography } from 'stylesheet';

export const ResultCard: React.FC = () => {
  return (
    <Container>
      <ImageContainer></ImageContainer>
      <DetailsContainer>
        <Place>Saint-Etienne-du-Valdonnez</Place>
        <Title>Balade au pays des menhirs</Title>
        <TagContainer>
          <FlexGap gap={getSpacing(2)}>
            <Chip>En famille</Chip>
            <Chip>Ciel étoilé</Chip>
            <Chip>En famille</Chip>
          </FlexGap>
        </TagContainer>
        <InformationContainer></InformationContainer>
      </DetailsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: ${getSpacing(4)} ${getSpacing(4)};

  border-radius: ${borderRadius.card};
  overflow: hidden;
`;

const ImageContainer = styled.div`
  height: ${getSpacing(31)};
  width: 100%;

  background-image: url('images/hiking-cover.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${getSpacing(4)};

  border: 1px solid ${colorPalette.greySoft};
  border-top: none;
  border-radius: 0 0 ${borderRadius.card} ${borderRadius.card};
`;

const Place = styled.span`
  ${typography.small}
`;

const Title = styled.span`
  margin-top: ${getSpacing(1)};

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${typography.h1}
  color: ${colorPalette.primary1};
`;

const TagContainer = styled.div`
  display: flex;
  margin-top: ${getSpacing(2)};
`;

/**
 * Emulates flex-gap which has yet to be implemented on every browser
 * https://coryrylan.com/blog/css-gap-space-with-flexbox
 */
const FlexGap = styled.div<{ gap: string }>`
  --gap: ${({ gap }) => gap};
  display: inline-flex;
  flex-wrap: wrap;
  margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
  width: calc(100% + var(--gap));

  & > * {
    margin: var(--gap) 0 0 var(--gap);
  }
`;

const InformationContainer = styled.div``;
