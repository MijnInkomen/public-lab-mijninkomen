/// <reference types="@docusaurus/theme-classic" />
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import type { Props } from '@theme/NavbarItem/DefaultNavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type { Props as DropdownProps } from '@theme/NavbarItem/DropdownNavbarItem';
import { useIngelogd, useIsAdmin, useIsHoofdbeheerder } from '@site/src/components/useIngelogd';

// Openbare menu-items staan er alleen als je niet bent ingelogd. Ingelogd navigeer je via het zijmenu.
const PubliekNavbarItem = (props: Props) => (useIngelogd() ? null : <DefaultNavbarItem {...props} />);

// Ingelogd staat naast het logo "Communityomgeving", zoals in het prototype.
const CommunitylabelNavbarItem = (props: Props) => (useIngelogd() ? <DefaultNavbarItem {...props} /> : null);

const BeheerNavbarItem = (props: Props) => (useIsAdmin() ? <DefaultNavbarItem {...props} /> : null);

// Eén knop Beheer met een uitklapmenu, zodat het menu op een laptopscherm past.
const BeheermenuNavbarItem = (props: DropdownProps) => (useIsAdmin() ? <DropdownNavbarItem {...props} /> : null);

const LedenNavbarItem = (props: Props) => (useIsHoofdbeheerder() ? <DefaultNavbarItem {...props} /> : null);

const InloggenNavbarItem = (props: Props) =>
  useIngelogd() ? (
    <DefaultNavbarItem {...props} label="Uitloggen" to="pathname:///oauth2/sign_out?rd=%2F" />
  ) : (
    <DefaultNavbarItem {...props} label="Inloggen" to="pathname:///inloggen/" />
  );

export default {
  ...ComponentTypes,
  'custom-publiek': PubliekNavbarItem,
  'custom-communitylabel': CommunitylabelNavbarItem,
  'custom-beheer': BeheerNavbarItem,
  'custom-beheermenu': BeheermenuNavbarItem,
  'custom-leden': LedenNavbarItem,
  'custom-inloggen': InloggenNavbarItem,
};
