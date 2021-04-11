import togglePostError from './togglePostError';

export default function formIsValid(inputs: HTMLInputElement[]) {
  let emptyField: HTMLInputElement[] = [];
  inputs.forEach((input) => {
    if (input.parentElement.classList.contains('err')) {
      togglePostError(input);
    }
    if (input.value === '') {
      emptyField.push(input);
    }
  });
  if (emptyField.length !== 0) {
    emptyField.forEach((input) => {
      if (!input.parentElement.classList.contains('err')) {
        togglePostError(input);
      }
    });
    return false;
  }
  return true;
}
