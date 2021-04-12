import togglePostError from './togglePostError';

export default function formIsValid(inputs: HTMLInputElement[]) {
  let invalidFields: HTMLInputElement[] = [];
  inputs.forEach((input) => {
    if (input.parentElement.classList.contains('err')) {
      togglePostError(input);
    }
    if (input.value.length < 5) {
      invalidFields.push(input);
    }
  });
  if (invalidFields.length !== 0) {
    invalidFields.forEach((input) => {
      if (!input.parentElement.classList.contains('err')) {
        togglePostError(input);
      }
    });
    return false;
  }
  return true;
}
