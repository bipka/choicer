import React, { useEffect, useRef, useState } from 'react';
import * as Ons from 'react-onsenui';

export default function EmojisPage() {
  const [emojis, setEmojis] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    fetch('https://api.github.com/emojis')
      .then((r) => r.json())
      .then((data) => {
        const list = Object.entries(data).map(([name, url]) => ({
          name,
          url
        }));
        setEmojis(list);
      });
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const img = e.target;
            img.src = img.dataset.src;
            observerRef.current.unobserve(img);
          }
        });
      },
      { rootMargin: '100px' }
    );
  }, []);

  useEffect(() => {
    if (!observerRef.current) return;
    document.querySelectorAll('img[data-src]').forEach((img) => {
      observerRef.current.observe(img);
    });
  }, [emojis]);

  return (
    <Ons.Page>
      <Ons.Card>
        <h2>Эмодзи (GitHub API)</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 48px)',
            gap: 8
          }}
        >
          {emojis.map((e) => (
            <img
              key={e.name}
              data-src={e.url}
              alt={e.name}
              title={e.name}
              width={48}
              height={48}
              style={{ background: '#eee' }}
            />
          ))}
        </div>
      </Ons.Card>
    </Ons.Page>
  );
}