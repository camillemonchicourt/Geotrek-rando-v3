import React from 'react';
import styled from 'styled-components';
import { borderRadius, colorPalette, getSpacing, typography, zIndex } from 'stylesheet';
import { buttonCssResets } from 'services/cssHelpers';
import { Map } from 'components/Icons/Map';
import { FormattedMessage } from 'react-intl';

export const OpenMapButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...nativeButtonProps
}) => {
  return (
    <MapButton type="button" {...nativeButtonProps} className="flex desktop:hidden">
      <FormattedMessage id="search.seeMap" />
      <Map size={24} className="ml-1" />
    </MapButton>
  );
};

const MapButton = styled.button`
  ${buttonCssResets}

  padding: ${getSpacing(3)} ${getSpacing(4)};

  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  border-radius: ${borderRadius.roundButton};

  ${typography.main};
  color: ${colorPalette.primary1};

  position: fixed;
  z-index: ${zIndex.floatingButton};
  bottom: ${getSpacing(6)};

  /* Horizontally center the button */
  left: 50%;
  transform: translateX(-50%);

  background-color: ${colorPalette.white};
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${colorPalette.primary2};
  }
`;
