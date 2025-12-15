import React from 'react';
import * as Ons from 'react-onsenui';
import ons from 'onsenui';

import ThemesList from './ThemesList';
import SubThemesList from './SubThemesList';
import Contents from './Contents';

export default function Choicer() {
  const renderPage = (route, nav) => {
    if (route.type === 'themes') {
      return <ThemesList key="themes" nav={nav} />;
    }
    if (route.type === 'subthemes') {
      return (
        <SubThemesList
          key="subthemes"
          nav={nav}
          themeId={route.themeId}
        />
      );
    }
    if (route.type === 'contents') {
      return (
        <Contents
          key="contents"
          subThemeId={route.subThemeId}
        />
      );
    }
  };

  return (
    <Ons.Navigator
      renderPage={renderPage}
      initialRoute={{ type: 'themes' }}
    />
  );
}