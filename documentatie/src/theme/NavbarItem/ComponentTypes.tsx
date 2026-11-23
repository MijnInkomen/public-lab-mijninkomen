/// <reference types="@docusaurus/theme-classic" />
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import type { Props } from '@theme/NavbarItem/DefaultNavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type { Props as DropdownProps } from '@theme/NavbarItem/DropdownNavbarItem';
import { useIngelogd, useIsAdmin, useIsHoofdbeheerder } from '@site/src/components/useIngelogd';

// Besloten pagina's (vergaderingen, roadmap, innovatie-backlog) staan alleen in het menu als je bent ingelogd.
const RoadmapNavbarItem = (props: Props) => (useIngelogd() ? <DefaultNavbarItem {...props} /> : null);

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
  'custom-roadmap': RoadmapNavbarItem,
  'custom-innovatie-backlog': RoadmapNavbarItem,
  'custom-beheer': BeheerNavbarItem,
  'custom-beheermenu': BeheermenuNavbarItem,
  'custom-leden': LedenNavbarItem,
  'custom-inloggen': InloggenNavbarItem,
};
