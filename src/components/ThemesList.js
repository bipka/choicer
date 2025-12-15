// src/components/ThemesList.js

import React, { useState } from 'react';
import * as Ons from 'react-onsenui';
import ons from 'onsenui';

import { useData } from '../DataManipulation.js';
import EditDelItem from './EditDelItem';

export default function ThemesList({ nav }) {
  const { data, add, move } = useData();
  const [selectedId, setSelectedId] = useState(null);

  const renderRow = (itm, ndx) => (
    <EditDelItem
      key={ndx}
      title={itm.title}
      where="themes"
      id={itm.id}
      onTap={() => {
        setSelectedId(itm.id);
        nav.pushPage({ type: 'subthemes', themeId: itm.id });
      }}
      onMoveUp={() => move('themes', itm.id, -1)}
      onMoveDown={() => move('themes', itm.id, 1)}
      isActive={selectedId === itm.id}
    />
  );

  const renderToolbar = () => (
    <Ons.Toolbar>
      <div className="center">Категории</div>
      <div className="right">
        <Ons.ToolbarButton
          onTap={() => {
            ons.notification
              .prompt('Напишите название категории:', {
                title: '',
                cancelable: true,
                buttonLabels: ['Отмена', 'ОК']
              })
              .then(newTheme => {
                if (newTheme) add('themes', newTheme);
              });
          }}
        >
          <Ons.Icon icon="md-plus" />
        </Ons.ToolbarButton>
      </div>
    </Ons.Toolbar>
  );

  const sortedThemes = [...data.themes].sort((a, b) => a.ord - b.ord);

  return (
    <Ons.Page renderToolbar={renderToolbar}>
      <Ons.List
        dataSource={sortedThemes}
        renderRow={renderRow}
      />
    </Ons.Page>
  );
}