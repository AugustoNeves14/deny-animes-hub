// public/js/theme.js

(() => {
  'use strict';

  // Chave usada para salvar a preferência do usuário.
  const THEME_STORAGE_KEY = 'theme-preference';
  // Seletor do botão.
  const THEME_TOGGLE_SELECTOR = '#theme-toggle';

  /**
   * Obtém a preferência de tema do usuário.
   * A ordem de prioridade é:
   * 1. Preferência salva no localStorage.
   * 2. Padrão para 'dark' se nada for encontrado (primeira visita).
   * @returns {'light' | 'dark'} O tema a ser aplicado.
   */
  const getThemePreference = () => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    // Se houver tema salvo, use-o. Senão, o padrão é 'dark'.
    return storedTheme || 'dark';
  };

  /**
   * Aplica o tema ao <body> e atualiza o estado do botão.
   * @param {'light' | 'dark'} theme - O nome do tema a ser aplicado.
   */
  const applyTheme = (theme) => {
    // Garante que apenas uma classe de tema esteja ativa por vez.
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);

    // Atualiza o atributo no botão para acessibilidade.
    const themeToggle = document.querySelector(THEME_TOGGLE_SELECTOR);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'dark');
    }
    
    console.log(`Tema definido como: ${theme}`);
  };

  // --- LÓGICA DE INICIALIZAÇÃO E EVENTOS ---

  // 1. Aplica o tema correto assim que o script é carregado.
  // Isso evita o "flash" de um tema incorreto.
  const initialTheme = getThemePreference();
  applyTheme(initialTheme);


  // 2. Espera o DOM estar totalmente carregado para adicionar o evento de clique.
  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector(THEME_TOGGLE_SELECTOR);

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        // Verifica qual tema está ativo atualmente pela classe do body.
        const isDark = document.body.classList.contains('dark-theme');
        // Define o novo tema como o oposto do atual.
        const newTheme = isDark ? 'light' : 'dark';
        
        // Salva a nova preferência do usuário.
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        // Aplica o novo tema visualmente.
        applyTheme(newTheme);
      });
    }
  });

})(); // IIFE para não poluir o escopo global.