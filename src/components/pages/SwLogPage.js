import React, { useState } from 'react';
import * as Ons from 'react-onsenui';

export default function SwLogPage() {
  const [logText, setLogText] = useState('');
  const [loading, setLoading] = useState(false);

  const loadLog = async () => {
    setLoading(true);
    try {
      const resp = await fetch('/log.html', { cache: 'no-store' });
      const text = await resp.text();
      setLogText(text || '(лог пуст)');
    } catch (e) {
      setLogText('Не удалось загрузить лог. Проверь, что Service Worker зарегистрирован и /log.html отдаётся SW.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Ons.Page>
      <Ons.Card>
        <h2>Журнал Service Worker</h2>

        <Ons.Button onClick={loadLog} disabled={loading}>
          {loading ? 'Загрузка…' : 'Загрузить лог'}
        </Ons.Button>

        <div style={{ marginTop: 12, fontSize: 12, whiteSpace: 'pre-wrap' }}>
          {logText}
        </div>
      </Ons.Card>
    </Ons.Page>
  );
}