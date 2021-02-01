import '@testing-library/jest-dom';
import nock from 'nock';

jest.mock('./src/services/envLoader.ts', () => ({
  getApiUrl: () => 'https://geotrekdemo.ecrins-parcnational.fr/api/v2',
}));

jest.mock('./src/components/Map', () => ({
  MapDynamicComponent: () => null,
}));

jest.mock('./src/modules/utils/api.config.ts', () => ({
  getApiCallsConfig: () => ({
    searchResultsPageSize: 5,
  }),
}));

// API calls should always be mocked else we might have inconsistencies
// depending on our testing environment
nock.disableNetConnect();

jest.mock('./src/modules/header/utills.ts', () => ({
  getHeaderConfig: () => ({
    logo: '',
    menu: {
      primaryItemsNumber: 3,
      items: [
        {
          translationId: 'header.nationalPark',
          url: 'https://www.ecrins-parcnational.fr/',
        },
        {
          translationId: 'header.parcHouses',
          url: 'https://www.ecrins-parcnational.fr/',
        },
        {
          translationId: 'header.usefulInformations',
          url: 'https://www.ecrins-parcnational.fr/',
        },
        {
          translationId: 'header.biodiv',
          url: 'https://www.ecrins-parcnational.fr/',
        },
        {
          translationId: 'header.transportation',
          url: 'https://www.ecrins-parcnational.fr/',
        },
        {
          translationId: 'header.yourOpinion',
          url: 'https://www.ecrins-parcnational.fr/',
        },
      ],
      shouldDisplayFavorite: true,
      supportedLanguages: ['fr'],
    },
  }),
}));
