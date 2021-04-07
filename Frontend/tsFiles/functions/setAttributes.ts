export default function setAttributes(elem: HTMLElement, attr: object): void {
  for (let key in attr) {
    elem.setAttribute(key, attr[key]);
  }
}
