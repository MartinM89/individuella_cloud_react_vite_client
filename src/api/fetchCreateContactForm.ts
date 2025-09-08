import type { Form } from '../App';

const VITE_API_KEY = import.meta.env.VITE_API_KEY;

const BASE_API_URL = `https://ht24individuellacloudmartinm.azurewebsites.net/api/${VITE_API_KEY}`;

export async function fetchCreateContactForm(form: Form) {
  try {
    await fetch(BASE_API_URL + 'SaveContact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
  } catch (error) {
    console.error('Something went wrong');
  }
}
