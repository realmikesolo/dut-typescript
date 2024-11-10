export function openModal(content: string): void {
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
