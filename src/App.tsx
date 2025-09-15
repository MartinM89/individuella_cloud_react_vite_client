import { useState, type ChangeEvent, type MouseEvent } from 'react';
import { fetchCreateContactForm } from './api/fetchCreateContactForm.ts';
import './App.css';
import ThemeSelect from './ThemeSelect.tsx';

/**
 * Input array, creates all inputs in the form.
 * Add new object to the array with type, name
 * and placeholder to generate a new input.
 */

const inputs = [
  { type: 'text', name: 'firstName', placeholder: 'First name' },
  { type: 'text', name: 'lastName', placeholder: 'Last name' },
  { type: 'email', name: 'email', placeholder: 'Email' },
  { type: 'text', name: 'phoneNumber', placeholder: 'Phone number' },
];

/**
 * Type matching the request to the api
 */

export type Form = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

const emptyForm: Form = { firstName: '', lastName: '', email: '', phoneNumber: '', message: '' };

type ErrorState = 'hidden' | 'visible';

/**
 * App component renders the form visible on the starting page.
 */

export default function App() {
  const [formInfo, setFormInfo] = useState<Form>(emptyForm);
  const [isErrorVisible, setIsErrorVisible] = useState<ErrorState>('hidden');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleErrors = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const newFormInfo: Form = { ...formInfo, [name]: value };

    if (!validateName(newFormInfo.firstName) && newFormInfo.firstName.length != 0) {
      setErrorMessage('First name needs to be 3 to 20 letters long');
      setIsErrorVisible('visible');
      return;
    }

    if (!validateName(newFormInfo.lastName) && newFormInfo.lastName.length != 0) {
      setErrorMessage('Last name needs to be 3 to 20 letters long');
      setIsErrorVisible('visible');
      return;
    }

    if (!validateGmail(newFormInfo.email) && newFormInfo.email.length != 0) {
      setErrorMessage('Email needs to be a "gmail"');
      setIsErrorVisible('visible');
      return;
    }

    if (!validatePhoneNumber(newFormInfo.phoneNumber) && newFormInfo.phoneNumber.length != 0) {
      setErrorMessage('Phone needs to be numbers only');
      setIsErrorVisible('visible');
      return;
    }

    if (!validateMessage(newFormInfo.message) && newFormInfo.message.length != 0) {
      setErrorMessage('Message cant be more than 250 letters long');
      setIsErrorVisible('visible');
      return;
    }

    setErrorMessage('');
    setIsErrorVisible('hidden');
  };

  const handleSumbit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      await fetchCreateContactForm(formInfo);

      setFormInfo(emptyForm);
      setIsErrorVisible('hidden');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ThemeSelect />
      <main className='form-wrapper'>
        <form className='form'>
          <h1 className='form-wrapper__title'>Contact Form</h1>
          {inputs.map(input => {
            return (
              <>
                <input
                  key={input.placeholder}
                  type={input.type}
                  placeholder={input.placeholder}
                  name={input.name}
                  value={formInfo[input.name as keyof Form]}
                  required
                  onChange={e => {
                    handleChange(e);
                    handleErrors(e);
                  }}
                />
              </>
            );
          })}
          <textarea
            placeholder='Message'
            name='message'
            value={formInfo.message}
            required
            onChange={e => {
              handleChange(e);
              handleErrors(e);
            }}
          ></textarea>
          <span className={`form-wrapper__errors ${isErrorVisible}`}>{errorMessage}</span>
          <button
            className={`form-wrapper__submit-button ${isLoading ? 'loading' : ''}`}
            type='submit'
            disabled={isLoading}
            onClick={e => handleSumbit(e)}
          >
            {isLoading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </main>
    </>
  );
}

/**
 * Validates if a name is between 3 to 20 letters long
 * @param {string} name
 * @returns {boolean}
 */

function validateName(name: string): boolean {
  if (name.length < 3 || name.length > 20) {
    return false;
  }
  return true;
}

/**
 * Validates if the email is a 'gmail'
 * @param {string} email
 * @returns {boolean}
 */

function validateGmail(email: string): boolean {
  if (!email.includes('@gmail.com')) {
    return false;
  }
  return true;
}

/**
 * Validates that the phone number contains only digits
 * @param {string} phoneNumber
 * @returns {boolean}
 */

function validatePhoneNumber(phoneNumber: string): boolean {
  if (isNaN(Number(phoneNumber))) {
    return false;
  }
  return true;
}

/**
 * Validates that the message is no longer than 250 letters long
 * @param {string} message
 * @returns {boolean}
 */

function validateMessage(message: string): boolean {
  if (message.length > 250) {
    return false;
  }
  return true;
}
