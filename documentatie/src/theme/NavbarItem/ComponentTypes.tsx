/// <reference types="@docusaurus/theme-classic" />
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import type { Props } from '@theme/NavbarItem/DefaultNavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type { Props as DropdownProps } from '@theme/NavbarItem/DropdownNavbarItem';
import { useIngelogd, useIsAdmin } from '@site/src/components/useIngelogd';

/** Beheer zit in dezelfde dropdown, maar alleen admins krijgen het te zien. */
const BEHEER = 'pathname:///community/beheer/';

// Besloten pagina's (roadmap, innovatie-backlog, regelingen, beheer) staan samen in één menu-item,
// dat alleen verschijnt als je bent ingelogd.
const CommunityNavbarItem = ({ items, ...props }: DropdownProps) => {
  const ingelogd = useIngelogd();
  const isAdmin = useIsAdmin();

  if (!ingelogd) return null;

  const zichtbaar = isAdmin ? items : items.filter((item) => item.to !== BEHEER);

  return <DropdownNavbarItem {...props} items={zichtbaar} />;
};

const InloggenNavbarItem = (props: Props) =>
  useIngelogd() ? (
    <DefaultNavbarItem {...props} label="Uitloggen" to="pathname:///oauth2/sign_out?rd=%2F" />
  ) : (
    <DefaultNavbarItem {...props} label="Inloggen" to="pathname:///inloggen/" />
  );

export default {
  ...ComponentTypes,
  'custom-community': CommunityNavbarItem,
  'custom-inloggen': InloggenNavbarItem,
};
