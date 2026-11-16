import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  ontwikkelingen: [
    {
      type: 'category',
      label: 'Ontwikkelingen',
      description: 'Meer informatie naar de huidige en toekomsitge ontwikkelingen die plaats vinden binnen MijnInkomen.',
      collapsible: false,
      className: 'sidebar__main-category',
      items: [
        {
          type: 'doc',
          id: 'ontwikkelingen/huidig',
        },
        {
          type: 'doc',
          id: 'ontwikkelingen/toekomst'
        },
      ],
    },
  ],
};

export default sidebars;
