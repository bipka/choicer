import React, { useEffect, useState } from 'react';

export default function ContentList({ items, disabled }) {
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    setEnter(false);
    const timer = setTimeout(() => setEnter(true), 0);
    return () => clearTimeout(timer);
  }, [items]);

  return (
    <section
      className={
        'list list--right ' +
        (enter ? 'list--enter ' : '') +
        (disabled ? 'list--disabled' : '')
      }
    >
      <h2 className="list__title">Контент</h2>

      {!disabled && items.length === 0 && (
        <p className="list__empty">Выберите под-тему по центру</p>
      )}

      <ul className="list__items">
        {items.map(item => (
          <li key={item.id} className="list__item list__item--content">
            <span className="list__item-order">{item.ord}.</span>
            <span className="list__item-title">{item.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}