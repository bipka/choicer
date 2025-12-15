// src/components/SubThemesList.js

import React, { useState } from 'react';
import * as Ons from 'react-onsenui';
import ons from 'onsenui';

import { useData } from '../DataManipulation.js';
import EditDelItem from './EditDelItem';

export default function SubThemesList({ themeId, nav }) {
  const { data, add, move } = useData();
  const [selectedId, setSelectedId] = useState(null);

  const choicedSubthemes = data.subthemes
    .filter(sub => sub.themeId === themeId)
    .sort((a, b) => a.ord - b.ord);

  const themeFound = data.themes.find(t => t.id === themeId);
  const ellipsisLen = 20;
  const themeTitle =
    themeFound && themeFound.title.length > ellipsisLen
      ? themeFound.title.slice(0, ellipsisLen) + '…'
      : themeFound
      ? themeFound.title
      : '';

  const renderRow = (itm, ndx) => (
    <EditDelItem
      key={ndx}
      title={itm.title}
      where="subthemes"
      id={itm.id}
      onTap={() => {
        setSelectedId(itm.id);
        nav.pushPage({ type: 'contents', subThemeId: itm.id });
      }}
      onMoveUp={() => move('subthemes', itm.id, -1, 'themeId')}
      onMoveDown={() => move('subthemes', itm.id, 1, 'themeId')}
      isActive={selectedId === itm.id}
    />
  );

  const renderToolbar = () => (
    <Ons.Toolbar>
      <div className="left">
        <Ons.BackButton>Назад</Ons.BackButton>
      </div>
      <div className="center">{themeTitle}</div>
      <div className="right">
        <Ons.ToolbarButton
          onTap={() => {
            ons.notification
              .prompt('Напишите название :', {
                title: '',
                cancelable: true,
                buttonLabels: ['Отмена', 'ОК']
              })
              .then(newSub => {
                if (newSub) add('subthemes', newSub, themeId);
              });
          }}
        >
          <Ons.Icon icon="md-plus" />
        </Ons.ToolbarButton>
      </div>
    </Ons.Toolbar>
  );

  return (
    <Ons.Page renderToolbar={renderToolbar}>
      <Ons.List
        dataSource={choicedSubthemes}
        renderRow={renderRow}
      />
    </Ons.Page>
  );
}