import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { MenuItem } from 'modules/header/interface';
import { Link } from 'components/Link';
import { useRouter } from 'next/router';
import { Plus } from '../../Icons/Plus';
import { Minus } from '../../Icons/Minus';
import { useBurgerMenuSection } from './useBurgerMenuSection';

export interface Props {
  title: string;
  items?: Array<string | MenuItem>;
  languages?: string[];
  onClick?: () => void;
}

const isItemString = (item: MenuItem | string): item is string => typeof item === 'string';

export const BurgerMenuSection: React.FC<Props> = ({ title, items, onClick }) => {
  const router = useRouter();
  const classNameTitle = 'flex items-center pt-4 pb-4 font-bold outline-none cursor-pointer';
  const classNameBorder = 'border-b pb-2 border-solid border-greySoft';
  const openIcon = <Plus size={24} />;
  const closeIcon = <Minus size={24} />;
  const { openState, setOpenState, intl } = useBurgerMenuSection();
  const updatePanelState = (openPanelIds: string[]) => {
    openPanelIds.length > 0 ? setOpenState('OPENED') : setOpenState('CLOSED');
  };
  return items || languages ? (
    <Accordion allowZeroExpanded onChange={updatePanelState}>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton
            className={`${classNameTitle} ${openState === 'CLOSED' ? classNameBorder : ''}`}
          >
            <span className="flex-grow">{title}</span>
            {openState === 'OPENED' ? closeIcon : openIcon}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={openState === 'OPENED' ? classNameBorder : ''}>
          {items?.map((item, i) => (
            <p key={i}>
              <a className="text-Mobile-C2 py-2" href={item.url}>
                {item.title}
              </a>
            </p>
          ))}
          {languages?.map(language => (
            <Link
              className="w-full"
              key={language}
              href={{
                pathname: router.pathname,
                query: { ...router.query },
              }}
              locale={language}
            >
              <p className="text-Mobile-C2 py-2 text-greyDarkColored">{language.toUpperCase()}</p>
            </Link>
          ))}
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  ) : (
    <span className={`${classNameTitle} ${classNameBorder}`} onClick={onClick}>
      {title}
    </span>
  );
};
