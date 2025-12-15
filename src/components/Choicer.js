import React, { useEffect, useState } from 'react';
import * as Ons from 'react-onsenui';

import ThemesList from './ThemesList';
import SubThemesList from './SubThemesList';
import Contents from './Contents';

import HomePage from './pages/HomePage';
import SwLogPage from './pages/SwLogPage';
import EmojisPage from './pages/EmojisPage';
import ContactsPage from './pages/ContactsPage';

export default function Choicer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('categories');

  // A2HS state — ВАЖНО: хранится на уровне всего приложения
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia?.('(display-mode: standalone)')?.matches ||
      window.navigator.standalone === true;

    setInstalled(isStandalone);

    const onBeforeInstallPrompt = (e) => {
      console.log('[A2HS] beforeinstallprompt fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    const onAppInstalled = () => {
      console.log('[A2HS] appinstalled fired');
      setInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  // Toggle, чтобы не ловить "splitter-side action already running"
  const onToggleMenu = () => setMenuOpen((v) => !v);

  const openSection = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  const renderMenu = () => (
    <Ons.Page>
      <Ons.List>
        <Ons.ListItem tappable onClick={() => openSection('home')}>
          <div className="left"><Ons.Icon icon="md-home" /></div>
          <div className="center">Главная</div>
        </Ons.ListItem>

        <Ons.ListItem tappable onClick={() => openSection('swlog')}>
          <div className="left"><Ons.Icon icon="md-assignment" /></div>
          <div className="center">Журнал</div>
        </Ons.ListItem>

        <Ons.ListItem tappable onClick={() => openSection('emojis')}>
          <div className="left"><Ons.Icon icon="md-mood" /></div>
          <div className="center">Эмодзи</div>
        </Ons.ListItem>

        <Ons.ListItem tappable onClick={() => openSection('contacts')}>
          <div className="left"><Ons.Icon icon="md-account" /></div>
          <div className="center">О нас</div>
        </Ons.ListItem>

        <Ons.ListItem tappable onClick={() => openSection('categories')}>
          <div className="left"><Ons.Icon icon="md-view-list" /></div>
          <div className="center">Категории</div>
        </Ons.ListItem>
      </Ons.List>
    </Ons.Page>
  );

  const renderCategories = () => {
    const renderPage = (route, nav) => {
      if (route.type === 'themes') {
        return <ThemesList key="themes" nav={nav} onOpenMenu={onToggleMenu} />;
      }
      if (route.type === 'subthemes') {
        return (
          <SubThemesList
            key="subthemes"
            nav={nav}
            themeId={route.themeId}
            onOpenMenu={onToggleMenu}
          />
        );
      }
      if (route.type === 'contents') {
        return (
          <Contents
            key="contents"
            subThemeId={route.subThemeId}
            onOpenMenu={onToggleMenu}
          />
        );
      }
      return null;
    };

    return (
      <Ons.Navigator
        renderPage={renderPage}
        initialRoute={{ type: 'themes' }}
      />
    );
  };

  const toolbarWithBurger = (title) => (
    <Ons.Toolbar>
      <div className="left">
        <Ons.ToolbarButton onClick={onToggleMenu}>
          <Ons.Icon icon="md-menu" />
        </Ons.ToolbarButton>
      </div><div className="center">{title}</div>
    </Ons.Toolbar>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <Ons.Page renderToolbar={() => toolbarWithBurger('Главная')}>
            <HomePage
              canInstall={canInstall}
              installed={installed}
              deferredPrompt={deferredPrompt}
              onInstallAccepted={() => {
                // На всякий случай обновим локальные флаги
                setInstalled(true);
                setCanInstall(false);
                setDeferredPrompt(null);
              }}
            />
          </Ons.Page>
        );

      case 'swlog':
        return (
          <Ons.Page renderToolbar={() => toolbarWithBurger('Журнал')}>
            <SwLogPage />
          </Ons.Page>
        );

      case 'emojis':
        return (
          <Ons.Page renderToolbar={() => toolbarWithBurger('Эмодзи')}>
            <EmojisPage />
          </Ons.Page>
        );

      case 'contacts':
        return (
          <Ons.Page renderToolbar={() => toolbarWithBurger('Информация')}>
            <ContactsPage />
          </Ons.Page>
        );

      case 'categories':
      default:
        // Внутри категорий управление тулбаром обычно своё (в ThemesList/SubThemesList/Contents),
        // поэтому здесь просто отдаём Navigator
        return renderCategories();
    }
  };

  return (
    <Ons.Splitter>
      <Ons.SplitterSide
        side="left"
        width="260px"
        collapse
        swipeable
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpen={() => setMenuOpen(true)}
      >
        {renderMenu()}
      </Ons.SplitterSide>

      <Ons.SplitterContent>
        {renderContent()}
      </Ons.SplitterContent>
    </Ons.Splitter>
  );
}