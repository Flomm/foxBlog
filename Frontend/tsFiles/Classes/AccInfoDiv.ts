export default class AccInfoDiv {
  infos: string[];
  name: string;
  data: string[];
  div: HTMLDivElement;

  constructor(name: string, infos: string[], data: string[]) {
    this.name = name;
    this.infos = infos;
    this.data = data;
  }

  createDiv(): HTMLDivElement {
    const newDiv: HTMLDivElement = document.createElement('div');
    const h2: HTMLHeadingElement = document.createElement('h2');
    h2.textContent = this.name;
    newDiv.appendChild(h2);
    for (let i = 0; i <= this.infos.length; i++) {
      const newP: HTMLParagraphElement = document.createElement('p');
      newP.textContent = this.infos[i];
      const newSpan: HTMLSpanElement = document.createElement('span');
      newSpan.textContent = this.data[i];
      newP.appendChild(newSpan);
      newDiv.appendChild(newP);
    }
    this.div = newDiv;
    return newDiv;
  }
}
