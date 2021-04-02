export default function createSuccessDiv(txt: string): void {
  const notSuccesDiv: HTMLDivElement = document.createElement('div');
  notSuccesDiv.textContent = txt;
  notSuccesDiv.classList.add('data');
  document.querySelector('.main').appendChild(notSuccesDiv);
}
