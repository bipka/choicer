import React, { useMemo, useState } from 'react';
import {
  Page,
  Toolbar,
  List,
  ListItem,
  Button,
  Icon,
} from 'react-onsenui';
import dataInitial from '../data';

// утилита для генерации новых id
function calcInitialNextId() {
  const all = [
    ...dataInitial.themes,
    ...dataInitial.subthemes,
    ...dataInitial.contents,
  ];
  return all.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

export default function ChoicerOnsen() {
  const [themes, setThemes] = useState(dataInitial.themes);
  const [subthemes, setSubthemes] = useState(dataInitial.subthemes);
  const [contents, setContents] = useState(dataInitial.contents);

  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const [selectedSubthemeId, setSelectedSubthemeId] = useState(null);

  const [nextId, setNextId] = useState(calcInitialNextId);

  // ====== вычисляемые списки ======

  const currentTheme = useMemo(
    () => themes.find(t => t.id === selectedThemeId) || null,
    [themes, selectedThemeId]
  );

  const currentSubtheme = useMemo(
    () =>
      subthemes.find(s => s.id === selectedSubthemeId) || null,
    [subthemes, selectedSubthemeId]
  );

  const subthemesForTheme = useMemo(
    () =>
      subthemes.filter(s => s.themeId === selectedThemeId),
    [subthemes, selectedThemeId]
  );

  const contentsForSubtheme = useMemo(
    () =>
      contents.filter(c => c.subthemeId === selectedSubthemeId),
    [contents, selectedSubthemeId]
  );

  // ====== общие хелперы (add / edit / delete / move) ======

  function askTitle(defaultValue = '') {
    const title = window.prompt('Введите название', defaultValue);
    if (!title) return null;
    return title.trim();
  }

  function handleAddTheme() {
    const title = askTitle();
    if (!title) return;

    setThemes(prev => {
      const newItem = {
        id: nextId,
        title,
        ord: prev.length + 1,
      };
      return [...prev, newItem];
    });
    setNextId(id => id + 1);
  }

  function handleAddSubtheme() {
    if (!selectedThemeId) {
      window.alert('Сначала выберите тему.');
      return;
    }
    const title = askTitle();
    if (!title) return;

    setSubthemes(prev => {
      const siblings = prev.filter(
        s => s.themeId === selectedThemeId
      );
      const newItem = {
        id: nextId,
        themeId: selectedThemeId,
        title,
        ord: siblings.length + 1,
      };
      return [...prev, newItem];
    });
    setNextId(id => id + 1);
  }

  function handleAddContent() {
    if (!selectedSubthemeId) {
      window.alert('Сначала выберите под-тему.');
      return;
    }
    const title = askTitle();
    if (!title) return;

    setContents(prev => {
      const siblings = prev.filter(
        c => c.subthemeId === selectedSubthemeId
      );
      const newItem = {
        id: nextId,
        subthemeId: selectedSubthemeId,
        title,
        ord: siblings.length + 1,
      };
      return [...prev, newItem];
    });
    setNextId(id => id + 1);
  }

  function handleEditTheme(id) {
    const item = themes.find(t => t.id === id);
    if (!item) return;

    const title = askTitle(item.title);
    if (!title) return;

    setThemes(prev =>
      prev.map(t => (t.id === id ? { ...t, title } : t))
    );
  }

  function handleEditSubtheme(id) {
    const item = subthemes.find(s => s.id === id);
    if (!item) return;
    const title = askTitle(item.title);
    if (!title) return;

    setSubthemes(prev =>
      prev.map(s => (s.id === id ? { ...s, title } : s))
    );
  }

  function handleEditContent(id) {
    const item = contents.find(c => c.id === id);
    if (!item) return;
    const title = askTitle(item.title);
    if (!title) return;

    setContents(prev =>
      prev.map(c => (c.id === id ? { ...c, title } : c))
    );
  }

  function handleDeleteTheme(id) {
    if (
      !window.confirm('Удалить тему и все её под-темы и контент?')
    ) {
      return;
    }

    const subIdsToDelete = subthemes
      .filter(s => s.themeId === id)
      .map(s => s.id);

    setThemes(prev => prev.filter(t => t.id !== id));
    setSubthemes(prev =>
      prev.filter(s => s.themeId !== id)
    );
    setContents(prev =>
      prev.filter(c => !subIdsToDelete.includes(c.subthemeId))
    );

    if (selectedThemeId === id) {
      setSelectedThemeId(null);
      setSelectedSubthemeId(null);
    }
  }

  function handleDeleteSubtheme(id) {
    if (!window.confirm('Удалить под-тему и её контент?')) {
      return;
    }

    setSubthemes(prev => prev.filter(s => s.id !== id));
    setContents(prev =>
      prev.filter(c => c.subthemeId !== id)
    );

    if (selectedSubthemeId === id) {
      setSelectedSubthemeId(null);
    }
  }

  function handleDeleteContent(id) {
    if (!window.confirm('Удалить элемент контента?')) {
      return;
    }
    setContents(prev => prev.filter(c => c.id !== id));
  }

  // перемещение: -1 = вверх, +1 = вниз

  function moveInArray(arr, matchFn, direction, groupFn) {
    const next = [...arr];
    const index = next.findIndex(matchFn);
    if (index === -1) return arr;

    const item = next[index];
    const groupId = groupFn ? groupFn(item) : null;

    let targetIndex = -1;

    if (direction < 0) {
      for (let i = index - 1; i >= 0; i--) {
        if (!groupFn || groupFn(next[i]) === groupId) {
          targetIndex = i;
          break;
        }
      }
    } else {
      for (let i = index + 1; i < next.length; i++) {
        if (!groupFn || groupFn(next[i]) === groupId) {
          targetIndex = i;
          break;
        }
      }
    }

    if (targetIndex === -1) return arr;

    const tmp = next[targetIndex];
    next[targetIndex] = next[index];
    next[index] = tmp;
    return next;
  }

  function handleMoveTheme(id, direction) {
    setThemes(prev =>
      moveInArray(prev, t => t.id === id, direction)
    );
  }

  function handleMoveSubtheme(id, direction) {
    setSubthemes(prev =>
      moveInArray(
        prev,
        s => s.id === id,
        direction,
        s => s.themeId
      )
    );
  }

  function handleMoveContent(id, direction) {
    setContents(prev =>
      moveInArray(
        prev,
        c => c.id === id,
        direction,
        c => c.subthemeId
      )
    );
  }

  // ====== рендер ======

  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="center">
            Choicer
            <div className="choicer-onsen__toolbar-subtitle">
              React + Onsen UI
            </div>
          </div>
        </Toolbar>
      )}
    >
      <div className="choicer-onsen">
        <div className="choicer-onsen__columns">
          {/* ТЕМЫ */}
          <div className="choicer-onsen__column">
            <div className="choicer-onsen__header-line">
              <span className="choicer-onsen__column-title">
                Тема
              </span>
              <Button
                modifier="quiet"
                onClick={handleAddTheme}
              >
                <Icon icon="md-plus" />
              </Button>
            </div>

            <List
              dataSource={themes}
              renderRow={(item, index) => (
                <ListItem
                  key={item.id}
                  tappable
                  onClick={() => {
                    setSelectedThemeId(item.id);
                    setSelectedSubthemeId(null);
                  }}
                  className={
                    item.id === selectedThemeId
                      ? 'choicer-onsen__listitem-selected'
                      : ''
                  }
                >
                  <div className="center">
                    {index + 1}. {item.title}
                  </div>
                  <div className="right">
                    <Button
                      modifier="quiet"
                      onClick={e => {
                        e.stopPropagation();
                        handleMoveTheme(item.id, -1);
                      }}
                    >
                      <Icon icon="md-arrow-up" />
                    </Button>
                    <Button
                      modifier="quiet"onClick={e => {
                        e.stopPropagation();
                        handleMoveTheme(item.id, 1);
                      }}
                    >
                      <Icon icon="md-arrow-down" />
                    </Button>
                    <Button
                      modifier="quiet"
                      onClick={e => {
                        e.stopPropagation();
                        handleEditTheme(item.id);
                      }}
                    >
                      <Icon icon="md-edit" />
                    </Button>
                    <Button
                      modifier="quiet"
                      onClick={e => {
                        e.stopPropagation();
                        handleDeleteTheme(item.id);
                      }}
                    >
                      <Icon icon="md-delete" />
                    </Button>
                  </div>
                </ListItem>
              )}
            />
          </div>

          {/* ПОД-ТЕМЫ */}
          <div className="choicer-onsen__column">
            <div className="choicer-onsen__header-line">
              <span className="choicer-onsen__column-title">
                Под-тема
              </span>
              <Button
                modifier="quiet"
                onClick={handleAddSubtheme}
                disabled={!selectedThemeId}
              >
                <Icon icon="md-plus" />
              </Button>
            </div>
            {!selectedThemeId && (
              <div className="choicer-onsen__hint">
                Выберите тему слева
              </div>
            )}
            <List
              dataSource={subthemesForTheme}
              renderRow={(item, index) => (
                <ListItem
                  key={item.id}
                  tappable
                  onClick={() =>
                    setSelectedSubthemeId(item.id)
                  }
                  className={
                    item.id === selectedSubthemeId
                      ? 'choicer-onsen__listitem-selected'
                      : ''
                  }
                >
                  <div className="center">
                    {index + 1}. {item.title}
                  </div>
                  <div className="right">
                    <Button
                      modifier="quiet"
                      onClick={e => {
                        e.stopPropagation();
                        handleMoveSubtheme(item.id, -1);
                      }}
                    >
                      <Icon icon="md-arrow-up" />
                    </Button>
                    <Button
                      modifier="quiet"
                      onClick={e => {
                        e.stopPropagation();
                        handleMoveSubtheme(item.id, 1);
                      }}
                    >
                      <Icon icon="md-arrow-down" />
                    </Button>
                    <Button
                      modifier="quiet"
                      onClick={e => {
                        e.stopPropagation();
                        handleEditSubtheme(item.id);
                      }}
                    >
                      <Icon icon="md-edit" />
                    </Button>
                    <Button
                      modifier="quiet"
                      onClick={e => {
                        e.stopPropagation();
                        handleDeleteSubtheme(item.id);
                      }}
                    >
                      <Icon icon="md-delete" />
                    </Button>
                  </div>
                </ListItem>
              )}
            />
          </div>

          {/* КОНТЕНТ */}
          <div className="choicer-onsen__column">
            <div className="choicer-onsen__header-line">
              <span className="choicer-onsen__column-title">
                Контент
              </span>
              <Button
                modifier="quiet"
                onClick={handleAddContent}disabled={!selectedSubthemeId}
              >
                <Icon icon="md-plus" />
              </Button>
            </div>
            {!selectedSubthemeId && (
              <div className="choicer-onsen__hint">
                Выберите под-тему по центру
              </div>
            )}
            <List
              dataSource={contentsForSubtheme}
              renderRow={(item, index) => (
                <ListItem key={item.id}>
                  <div className="center">
                    {index + 1}. {item.title}
                  </div>
                  <div className="right">
                    <Button
                      modifier="quiet"
                      onClick={() =>
                        handleMoveContent(item.id, -1)
                      }
                    >
                      <Icon icon="md-arrow-up" />
                    </Button>
                    <Button
                      modifier="quiet"
                      onClick={() =>
                        handleMoveContent(item.id, 1)
                      }
                    >
                      <Icon icon="md-arrow-down" />
                    </Button>
                    <Button
                      modifier="quiet"
                      onClick={() =>
                        handleEditContent(item.id)
                      }
                    >
                      <Icon icon="md-edit" />
                    </Button>
                    <Button
                      modifier="quiet"
                      onClick={() =>
                        handleDeleteContent(item.id)
                      }
                    >
                      <Icon icon="md-delete" />
                    </Button>
                  </div>
                </ListItem>
              )}
            />
          </div>
        </div>
      </div>
    </Page>
  );
}