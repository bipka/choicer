import React from 'react';
import { createRoot } from 'react-dom/client';
import './app.css';

// Пути до CSS Onsen (если не соберётся – попробуй '../node_modules/...')
// здесь считаем, что структура: www/node_modules + www/ReactProject/src
import '../../node_modules/onsenui/css/onsenui.css';
import '../../node_modules/onsenui/css/onsen-css-components.css';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';

import Choicer from './components/Choicer.js';
import DataManipulation from './DataManipulation.js';

ons.ready(function () {
  document.body.innerHTML = '<div id="root"></div>';
  const root = createRoot(document.getElementById('root'));
  root.render(
    <DataManipulation>
      <Choicer />
    </DataManipulation>
  );
});