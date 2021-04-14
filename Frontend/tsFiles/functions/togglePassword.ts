export default function togglePassword(label: HTMLLabelElement): void {
  const icon: HTMLElement = label.querySelector('i');
  const pwInput: HTMLInputElement = document.querySelector('form').elements[1] as HTMLInputElement;
  if (pwInput.type === 'password') {
    pwInput.type = 'text';
    label.querySelector('span').textContent = 'Hide password';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    pwInput.type = 'password';
    label.querySelector('span').textContent = 'Show password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}
