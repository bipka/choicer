import React, { useState } from 'react';
import * as Ons from 'react-onsenui';
import ons from 'onsenui';

import { useData } from '../DataManipulation.js';
import EditDelItem from './EditDelItem';

const getElementLabelByTheme = (themeTitle) => {
  if (!themeTitle) return 'элемента';
  const t = themeTitle.toLowerCase();

  if (t.includes('фильм')) return 'фильма';
  if (t.includes('подкаст')) return 'подкаста';
  if (t.includes('клип')) return 'клипа';
  if (t.includes('дорам')) return 'дорамы';
  if (t.includes('аниме')) return 'аниме';
  if (t.includes('сериал')) return 'сериала';

  return 'элемента';
};

export default function Contents({ subThemeId, onOpenMenu }) {
  const { data, add, move } = useData();

  const choicedContents = data.contents
    .filter(track => track.subThemeId === subThemeId)
    .sort((a, b) => a.ord - b.ord);

  const subThemeFound = data.subthemes.find(s => s.id === subThemeId);
  const themeFound = subThemeFound
    ? data.themes.find(t => t.id === subThemeFound.themeId)
    : null;

  const ellipsisLen = 20;
  const subTitle =
    subThemeFound && subThemeFound.title.length > ellipsisLen
      ? subThemeFound.title.slice(0, ellipsisLen) + '…'
      : subThemeFound
      ? subThemeFound.title
      : '';

  const elementWord = getElementLabelByTheme(themeFound?.title || '');

  const [selectedId, setSelectedId] = useState(null);
  const selected = choicedContents.find(c => c.id === selectedId) || null;

  const renderRow = (itm, ndx) => (
    <EditDelItem
      key={ndx}
      title={itm.title}
      where="contents"
      id={itm.id}
      onTap={() => setSelectedId(itm.id)}
      onMoveUp={() => move('contents', itm.id, -1, 'subThemeId')}
      onMoveDown={() => move('contents', itm.id, 1, 'subThemeId')}
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

      <div className="center">{subTitle}</div>

      <div className="right">
        <Ons.ToolbarButton
          onClick={() => {
            ons.notification
              .prompt(`Напишите название ${elementWord}:`, {
                title: '',
                cancelable: true,
                buttonLabels: ['Отмена', 'ОК']
              })
              .then(newItem => {
                if (newItem) add('contents', newItem, subThemeId);
              });
          }}
        >
          <Ons.Icon icon="md-plus" />
        </Ons.ToolbarButton>
      </div>
    </Ons.Toolbar>
  );

  const renderDetailsCard = () => {
    if (!choicedContents.length) {
      return (
        <Ons.Card className="content-details-card">
          <div className="content-details-empty">
            В этом разделе пока нет элементов. Добавьте новый с помощью кнопки «+».
          </div>
        </Ons.Card>
      );
    }

    if (!selected) {
      return (
        <Ons.Card className="content-details-card">
          <div className="content-details-empty">Выберите элемент из списка ниже.</div>
        </Ons.Card>
      );
    }

    const { title, year, director, cast, rating, description, trailerUrl, imageUrl } = selected;

    const hasInfo = !!(year || director || cast || rating || description || trailerUrl || imageUrl);

    if (!hasInfo) {
      return (
        <Ons.Card className="content-details-card">
          <div className="content-details-title">{title}</div>
          <div className="content-details-empty">Подробная информация пока не добавлена.</div>
        </Ons.Card>
      );
    }

    return (
      <Ons.Card className="content-details-card">
        <div className="content-details-title">
          {title}
          {year && <span className="content-details-year"> · {year}</span>}
        </div>

        {rating && <div className="content-details-rating">Рейтинг: {rating}</div>}

        {trailerUrl && (<div className="content-details-trailer">
            <iframe
              src={trailerUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {!trailerUrl && imageUrl && (
          <div className="content-details-image">
            <img src={imageUrl} alt={title} />
          </div>
        )}

        {description && <div className="content-details-description">{description}</div>}

        {(director || cast) && (
          <div className="content-details-meta">
            {director && (
              <div>
                <span className="content-details-label">Режиссёр / автор:</span> {director}
              </div>
            )}
            {cast && (
              <div>
                <span className="content-details-label">В ролях / участие:</span> {cast}
              </div>
            )}
          </div>
        )}
      </Ons.Card>
    );
  };

  return (
    <Ons.Page renderToolbar={renderToolbar}>
      {renderDetailsCard()}
      <Ons.List dataSource={choicedContents} renderRow={renderRow} />
    </Ons.Page>
  );
}