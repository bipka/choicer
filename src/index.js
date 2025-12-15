import React from 'react';
import { createRoot } from 'react-dom/client';
import './app.css';

import '../../node_modules/onsenui/css/onsenui.css';
import '../../node_modules/onsenui/css/onsen-css-components.css';

import ons from 'onsenui';

import Choicer from './components/Choicer.js';
import DataManipulation from './DataManipulation.js';

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      // полезно для отладки жизненного цикла
      console.log('[SW] registered', reg);

      reg.addEventListener('updatefound', () => {
        console.log('[SW] update found');
      });
    } catch (e) {
      console.error('[SW] registration failed', e);
    }
  });
}

ons.ready(function () {
  document.body.innerHTML = '<div id="root"></div>';
  const root = createRoot(document.getElementById('root'));
  root.render(
    <DataManipulation>
      <Choicer />
    </DataManipulation>
  );

  registerServiceWorker();
});