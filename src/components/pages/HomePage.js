import React from 'react';
import * as Ons from 'react-onsenui';

export default function HomePage({
  canInstall,
  installed,
  deferredPrompt,
  onInstallAccepted
}) {
  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice?.outcome === 'accepted') {
      onInstallAccepted?.();
    }
  };

  return (
    <Ons.Card>
      <h2>Главная</h2>
      <p>
        Choicer — PWA на React + Onsen UI. Меню: Splitter. Есть Service Worker (кеш/оффлайн),
        журнал SW и загрузка Emojis через GitHub API.
      </p>

      {!installed && canInstall && (
        <div style={{ marginTop: 12 }}>
          <Ons.Button onClick={handleInstall}>INSTALL</Ons.Button>
        </div>
      )}

      {installed && (
        <p style={{ marginTop: 12 }}>
          ✅ Приложение установлено (standalone)
        </p>
      )}

      {/* Отладка: можешь удалить перед защитой */}
      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.75 }}>
        installed: {String(installed)}<br />
        canInstall: {String(canInstall)}<br />
        deferredPrompt: {deferredPrompt ? 'yes' : 'no'}
      </div>
    </Ons.Card>
  );
}