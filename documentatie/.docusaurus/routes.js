import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug/',
    component: ComponentCreator('/__docusaurus/debug/', '546'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config/',
    component: ComponentCreator('/__docusaurus/debug/config/', '8a8'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content/',
    component: ComponentCreator('/__docusaurus/debug/content/', '2da'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData/',
    component: ComponentCreator('/__docusaurus/debug/globalData/', '178'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata/',
    component: ComponentCreator('/__docusaurus/debug/metadata/', 'd6c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry/',
    component: ComponentCreator('/__docusaurus/debug/registry/', '6e3'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes/',
    component: ComponentCreator('/__docusaurus/debug/routes/', 'cab'),
    exact: true
  },
  {
    path: '/blog/',
    component: ComponentCreator('/blog/', 'dac'),
    exact: true
  },
  {
    path: '/community/beheer/',
    component: ComponentCreator('/community/beheer/', '90c'),
    exact: true
  },
  {
    path: '/contact/',
    component: ComponentCreator('/contact/', '800'),
    exact: true
  },
  {
    path: '/geen-toegang/',
    component: ComponentCreator('/geen-toegang/', 'a41'),
    exact: true
  },
  {
    path: '/initiatief-melden/',
    component: ComponentCreator('/initiatief-melden/', '1c6'),
    exact: true
  },
  {
    path: '/inloggen/',
    component: ComponentCreator('/inloggen/', 'fbc'),
    exact: true
  },
  {
    path: '/meer-weten/',
    component: ComponentCreator('/meer-weten/', '623'),
    exact: true
  },
  {
    path: '/meer-weten/communitylid/',
    component: ComponentCreator('/meer-weten/communitylid/', 'c00'),
    exact: true
  },
  {
    path: '/meer-weten/webinar/',
    component: ComponentCreator('/meer-weten/webinar/', 'e50'),
    exact: true
  },
  {
    path: '/ontwikkelingen/project/aansluiting-s-hertogenbosch/',
    component: ComponentCreator('/ontwikkelingen/project/aansluiting-s-hertogenbosch/', '4f6'),
    exact: true
  },
  {
    path: '/ontwikkelingen/project/basisproces-bijzondere-bijstand/',
    component: ComponentCreator('/ontwikkelingen/project/basisproces-bijzondere-bijstand/', 'de8'),
    exact: true
  },
  {
    path: '/ontwikkelingen/project/status-voor-inwoners/',
    component: ComponentCreator('/ontwikkelingen/project/status-voor-inwoners/', '70a'),
    exact: true
  },
  {
    path: '/privacy/',
    component: ComponentCreator('/privacy/', 'd56'),
    exact: true
  },
  {
    path: '/roadmap/',
    component: ComponentCreator('/roadmap/', '641'),
    exact: true
  },
  {
    path: '/toegang-aanvragen/',
    component: ComponentCreator('/toegang-aanvragen/', '110'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'b02'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '199'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '1e8'),
            routes: [
              {
                path: '/waar-werkt-het-naar-toe/',
                component: ComponentCreator('/waar-werkt-het-naar-toe/', 'd6b'),
                exact: true,
                sidebar: "ontwikkelingen"
              },
              {
                path: '/wat-kan-het/',
                component: ComponentCreator('/wat-kan-het/', '3a1'),
                exact: true,
                sidebar: "ontwikkelingen"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
