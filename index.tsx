/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

document.addEventListener('DOMContentLoaded', () => {
  // Main navigation logic
  const mainNavItems = document.querySelectorAll('.main-nav-item');
  const mainContentSections = document.querySelectorAll('.content-section');

  mainNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = (item as HTMLElement).dataset.target;
      if (!targetId) return;

      mainNavItems.forEach(i => i.classList.remove('active'));
      mainContentSections.forEach(s => s.classList.remove('active'));

      item.classList.add('active');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });

  // Sub-navigation (tabs) logic
  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('.section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = (tab as HTMLElement).dataset.target;
      if (!targetId) return;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      sections.forEach(s => s.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });

  // Modal logic for Genes/Family History
  const genesPill = document.getElementById('genes-pill');
  const modalOverlay = document.getElementById('genes-modal-overlay');

  if (genesPill && modalOverlay) {
    const modalCloseButton = modalOverlay.querySelector('.modal-close');

    const openModal = () => {
      modalOverlay.classList.add('active');
    };

    const closeModal = () => {
      modalOverlay.classList.remove('active');
    };

    genesPill.addEventListener('click', openModal);
    
    if (modalCloseButton) {
      modalCloseButton.addEventListener('click', closeModal);
    }

    modalOverlay.addEventListener('click', (event) => {
      if (event.target === modalOverlay) {
        closeModal();
      }
    });
    
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
});
