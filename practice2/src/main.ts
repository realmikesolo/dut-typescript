import { fetchData } from './modules/data';

document.addEventListener('DOMContentLoaded', () => {
  const loadDataBtn: HTMLElement | null = document.getElementById('loadDataBtn');
  loadDataBtn?.addEventListener('click', () => fetchData());

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      document.body.style.backgroundColor = '#f0f0f0';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  });
});
