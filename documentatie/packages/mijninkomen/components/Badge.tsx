import { DataBadge } from '@nl-design-system-candidate/data-badge-react/css';
import type { PropsWithChildren } from 'react';

interface BadgeProps {
  soort?: 'voorbeeld' | 'status';
}

export const Badge = ({ soort = 'voorbeeld', children }: PropsWithChildren<BadgeProps>) => (
  <DataBadge className={`mijninkomen-badge mijninkomen-badge--${soort}`}>{children ?? 'Voorbeeld'}</DataBadge>
);
