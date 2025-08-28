import type { Form } from '../App';

export async function fetchCreateContactForm(form: Form) {
  console.log(import.meta.env.VITE_API_BASE_URL + 'SaveContact');

  await fetch(`${import.meta.env.VITE_API_BASE_URL}SaveContact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
}
