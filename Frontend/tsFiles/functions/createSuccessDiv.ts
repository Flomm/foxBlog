export default function createSuccessDiv(txt: string, parent: HTMLDivElement): void {
  const notSuccesDiv: HTMLDivElement = document.createElement('div');
  notSuccesDiv.textContent = txt;
  notSuccesDiv.classList.add('data');
  parent.appendChild(notSuccesDiv);
}
