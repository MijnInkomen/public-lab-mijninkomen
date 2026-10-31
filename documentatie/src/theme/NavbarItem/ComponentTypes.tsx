/// <reference types="@docusaurus/theme-classic" />
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import type { Props } from '@theme/NavbarItem/DefaultNavbarItem';
import { useIngelogd } from '@site/src/components/useIngelogd';

const RoadmapNavbarItem = (props: Props) => (useIngelogd() ? <DefaultNavbarItem {...props} /> : null);

const InloggenNavbarItem = (props: Props) =>
  useIngelogd() ? (
    <DefaultNavbarItem {...props} label="Uitloggen" to="pathname:///oauth2/sign_out?rd=%2F" />
  ) : (
    <DefaultNavbarItem {...props} label="Inloggen" to="pathname:///inloggen/" />
  );

export default {
  ...ComponentTypes,
  'custom-roadmap': RoadmapNavbarItem,
  'custom-inloggen': InloggenNavbarItem,
};
