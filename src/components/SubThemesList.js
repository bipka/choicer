import React, { useState } from 'react';
import * as Ons from 'react-onsenui';
import ons from 'onsenui';

import { useData } from '../DataManipulation.js';
import EditDelItem from './EditDelItem';

const getSubthemeLabelByTheme = (themeTitle) => {
  if (!themeTitle) return 'подтемы';
  const t = themeTitle.toLowerCase();

  if (t.includes('фильм')) return 'фильма';
  if (t.includes('подкаст')) return 'подкаста';
  if (t.includes('клип')) return 'клипа';
  if (t.includes('дорам')) return 'дорамы';
  if (t.includes('аниме')) return 'аниме';
  if (t.includes('сериал')) return 'сериала';

  return 'подтемы';
};

export default function SubThemesList({ themeId, nav, onOpenMenu }) {
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

  const itemWord = getSubthemeLabelByTheme(themeFound?.title || '');

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
      <div className="left" style={{ display: 'flex', alignItems: 'center' }}>
        <Ons.ToolbarButton onClick={onOpenMenu}>
          <Ons.Icon icon="md-menu" />
        </Ons.ToolbarButton>
        <Ons.BackButton>Назад</Ons.BackButton>
      </div>

      <div className="center">{themeTitle}</div>

      <div className="right">
        <Ons.ToolbarButton
          onClick={() => {
            ons.notification
              .prompt(`Напишите категорию ${itemWord}:`, {
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
      <Ons.List dataSource={choicedSubthemes} renderRow={renderRow} />
    </Ons.Page>
  );
}