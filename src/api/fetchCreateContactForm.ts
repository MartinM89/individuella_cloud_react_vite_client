import type { Form } from '../App';

const BASE_API_URL = 'https://ht24individuellacloudmartinm.azurewebsites.net/api/';

export async function fetchCreateContactForm(form: Form) {
  await fetch(BASE_API_URL + 'SaveContact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
}
