export default function checkLogin(inputs: HTMLInputElement[]): boolean {
  let emptyField: HTMLInputElement[] = [];
  inputs.forEach((input) => {
    const labelEl: HTMLLabelElement = document.querySelector(`label[for=${input.name}]`);
    if (labelEl.classList.contains('err')) {
      labelEl.classList.toggle('err');
    }
    if (input.value === '') {
      emptyField.push(input);
    }
  });
  if (emptyField.length !== 0) {
    emptyField.forEach((input) => {
      const labelEl: HTMLLabelElement = document.querySelector(`label[for=${input.name}]`);
      labelEl.classList.toggle('err');
      if (!labelEl.classList.contains('err')) {
        labelEl.classList.toggle('err');
      }
    });
    return false;
  }
  return true;
}
