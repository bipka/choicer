// src/components/EditDelItem.js

import React, { useRef } from 'react';
import * as Ons from 'react-onsenui';
import ons from 'onsenui';
import { useData } from '../DataManipulation.js';

export default function EditDelItem({
  title,
  where,
  id,
  onTap,
  onMoveUp,
  onMoveDown,
  isActive = false
}) {
  const { del, edit } = useData();
  const carouselRef = useRef(null);

  const resetCarousel = () => {
    if (carouselRef.current) {
      carouselRef.current.setActiveIndex(0, { animation: 'none' });
    }
  };

  const handleEdit = () => {
    ons.notification
      .prompt('Измените название:', {
        title: '',
        cancelable: true,
        buttonLabels: ['Отмена', 'ОК'],
        defaultValue: title
      })
      .then(newTitle => {
        if (newTitle && newTitle !== title) {
          edit(where, id, newTitle);
        }
        resetCarousel();
      });
  };

  const handleDelete = () => {
    ons.notification
      .confirm('Удалить элемент?', {
        title: '',
        cancelable: true,
        buttonLabels: ['Отмена', 'Удалить']
      })
      .then(answer => {
        if (answer === 1) {
          del(where, id);
        }
        resetCarousel();
      });
  };

  const handleMoveUp = () => {
    if (onMoveUp) onMoveUp();
    resetCarousel();
  };

  const handleMoveDown = () => {
    if (onMoveDown) onMoveDown();
    resetCarousel();
  };

  const handleTap = () => {
    if (onTap) onTap();
  };

  return (
    <Ons.ListItem expandable={false}>
      <Ons.Carousel
        ref={carouselRef}
        className="e-d-carousel"
        swipeable
        overscrollable={false}
        autoScroll
      >
        {/* Основной вид строки списка */}
        <Ons.CarouselItem onClick={handleTap}>
          <div
            className={
              'list-action-item' +
              (isActive ? ' list-action-item--active' : '')
            }
          >
            <div className="center">{title}</div>
          </div>
        </Ons.CarouselItem>

        {/* Меню действий при свайпе */}
        <Ons.CarouselItem>
          <div className="list-action-menu">
            <button
              className="list-action-menu-btn"
              onClick={handleEdit}
            >
              Редактировать
            </button>
            <button
              className="list-action-menu-btn"
              onClick={handleMoveUp}
            >
              ↑
            </button>
            <button
              className="list-action-menu-btn"
              onClick={handleMoveDown}
            >
              ↓
            </button>
            <button
              className="list-action-menu-btn list-action-menu-btn-del"
              onClick={handleDelete}
            >
              Удалить
            </button>
          </div>
        </Ons.CarouselItem>
      </Ons.Carousel>
    </Ons.ListItem>
  );
}