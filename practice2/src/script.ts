interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function openModal(content: string): void {
  const backdrop: HTMLDivElement = document.createElement('div');
  backdrop.className = 'modal-backdrop';

  const modal: HTMLDivElement = document.createElement('div');
  modal.className = 'modal';

  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.textContent = '✕';
  closeButton.onclick = () => backdrop.remove();

  modal.append(closeButton);
  modal.append(document.createTextNode(content));
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
}


async function fetchData(): Promise<void> {
  const response: Response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await response.json();
  const content: string = posts.slice(0, 5).map(post => post.title).join("\n");
  openModal(content);
}

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
