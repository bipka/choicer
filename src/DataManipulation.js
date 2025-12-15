import React, { createContext, useContext, useState } from 'react';
import initData from './data.js';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export default function DataManipulation({ children }) {
  const [data, setData] = useState(initData);

  const getMax = (arr, field) => {
    let maxVal = 0;
    arr.forEach(itm => {
      if (itm[field] > maxVal) maxVal = itm[field];
    });
    return maxVal;
  };

  // --------- ДОБАВЛЕНИЕ ----------
  const add = (where, newVal, parentId = null) => {
    if (!newVal) return;

    const clone = { ...data };
    const list = clone[where];

    const maxId = getMax(list, 'id');
    const maxOrd = getMax(list, 'ord');

    const newItem = {
      id: maxId + 1,
      title: newVal,
      ord: maxOrd + 1
    };

    if (where === 'subthemes' && parentId != null) {
      newItem.themeId = parentId;
    }
    if (where === 'contents' && parentId != null) {
      newItem.subThemeId = parentId;
    }

    clone[where] = [...list, newItem];
    setData(clone);
  };

  // --------- РЕДАКТИРОВАНИЕ ----------
  const edit = (where, id, newTitle) => {
    if (!newTitle) return;
    const clone = { ...data };
    clone[where] = clone[where].map(itm =>
      itm.id === id ? { ...itm, title: newTitle } : itm
    );
    setData(clone);
  };

  // --------- УДАЛЕНИЕ (каскад) ----------
  const del = (where, id) => {
    const clone = { ...data };

    // удалить сам элемент
    clone[where] = clone[where].filter(itm => itm.id !== id);

    if (where === 'themes') {
      // удалить все под-темы и контент по этой теме
      const subIds = clone.subthemes
        .filter(st => st.themeId === id)
        .map(st => st.id);

      clone.subthemes = clone.subthemes.filter(
        st => st.themeId !== id
      );
      clone.contents = clone.contents.filter(
        c => !subIds.includes(c.subThemeId)
      );
    }

    if (where === 'subthemes') {
      // удалить контент этой подтемы
      clone.contents = clone.contents.filter(
        c => c.subThemeId !== id
      );
    }

    setData(clone);
  };

  // --------- ПЕРЕМЕЩЕНИЕ ВВЕРХ/ВНИЗ ----------
  // where: 'themes' | 'subthemes' | 'contents'
  // id: id элемента
  // direction: -1 (вверх) | 1 (вниз)
  // parentKey: null | 'themeId' | 'subThemeId'
  const move = (where, id, direction, parentKey = null) => {
    const clone = { ...data };
    const list = [...clone[where]];

    const item = list.find(i => i.id === id);
    if (!item) return;

    const groupValue = parentKey ? item[parentKey] : null;

    // формируем группу, внутри которой можно двигать
    const group = list
      .filter(i => (!parentKey || i[parentKey] === groupValue))
      .sort((a, b) => a.ord - b.ord);

    const idx = group.findIndex(i => i.id === id);
    const newIdx = idx + direction;

    if (idx === -1 || newIdx < 0 || newIdx >= group.length) {
      return; // некуда двигать
    }

    // меняем элементы местами в группе
    const tmp = group[idx];
    group[idx] = group[newIdx];
    group[newIdx] = tmp;

    // пересчитываем ord внутри группы (1..n)
    group.forEach((gItem, i) => {
      const real = list.find(x => x.id === gItem.id);
      if (real) real.ord = i + 1;
    });

    clone[where] = list;
    setData(clone);
  };

  return (
    <DataContext.Provider value={{ data, add, edit, del, move }}>
      {children}
    </DataContext.Provider>
  );
}