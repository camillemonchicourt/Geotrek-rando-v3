import getNextConfig from 'next/config';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getFlatPages } from 'modules/flatpage/connector';
import { MenuItem } from 'modules/header/interface';
import { getDefaultLanguage } from 'modules/header/utills';
import { FooterConfigInput, FooterConfigOutput, PortalLinkStatic } from './interface';

const getFooterConfig = (): FooterConfigInput => {
  const {
    publicRuntimeConfig: { footer },
  } = getNextConfig();

  return footer;
};

export const useFooter = (): { config: FooterConfigOutput } => {
  const { links, ...rest } = getFooterConfig();
  let nextLinks;
  // If the footer config contains `informationID` keys,the app retrieves "flatpages" to get the corresponding label/url
  if (links && links.some(link => 'informationID' in link)) {
    const language = useRouter().locale ?? getDefaultLanguage();
    const { data } = useQuery<MenuItem[], Error>(['header', language], () =>
      getFlatPages(language),
    );
    nextLinks = links
      .map(link => {
        if ('informationID' in link) {
          const page = data?.find(({ id }) => id === link.informationID);
          if (page) {
            return { label: page.title, url: page.url };
          }
          return null;
        }
        return link;
      })
      // If the informationID doesn't match with any flatPage id, it won't be displayed
      .filter(Boolean) as PortalLinkStatic[];
  }

  return { config: { links: nextLinks ?? (links as PortalLinkStatic[]), ...rest } };
};
