import useIsBrowser from '@docusaurus/useIsBrowser';
import { Heading, SpotlightSection } from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { Link } from '../Link';
import { datumVoluit, volgendWebinar, webinar } from './content';
import './home.css';

export const HomeWebinar = () => {
  // De build maakt de pagina vooraf klaar: pas in de browser is de datum van vandaag bekend.
  const datum = useIsBrowser() ? volgendWebinar() : undefined;

  return (
    <div className="container mijninkomen-sectie">
      <SpotlightSection className="mijninkomen-verwijzing">
        <Heading level={2}>{webinar.titel}</Heading>
        <Paragraph>
          {webinar.tekst}
          {datum && (
            <>
              {' '}
              {webinar.volgende}{' '}
              <strong>
                <time dateTime={datum}>{datumVoluit(datum)}</time>
              </strong>
              .
            </>
          )}
        </Paragraph>
        <Link href="/meer-weten/webinar">
          {webinar.link} <span aria-hidden="true">→</span>
        </Link>
      </SpotlightSection>
    </div>
  );
};
